import React, { useEffect, useState } from 'react';
import ForgeReconciler, { 
  Text, 
  Stack, 
  Button, 
  Textfield, 
  SectionMessage,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Inline
} from '@forge/react';
import { invoke } from '@forge/bridge';
import TemplateEditor from './template-editor.jsx';

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [editName, setEditName] = useState('');
  const [deletingTemplate, setDeletingTemplate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fieldEditingTemplate, setFieldEditingTemplate] = useState(null);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedFieldKey, setSelectedFieldKey] = useState('');
  const [selectedFieldValue, setSelectedFieldValue] = useState('');
  const [fieldEditorType, setFieldEditorType] = useState('text');
  const [savingField, setSavingField] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await invoke('getAllTemplates');
      console.log('loadTemplates result:', result);
      if (result && result.success && Array.isArray(result.templates)) {
        const sanitizedTemplates = result.templates.map(t => ({
          id: t.id, 
          name: t.name || 'Unnamed Template',
          fields: t.fields || {},
          metadata: t.metadata || {},
          sourceIssueKey: t.sourceIssueKey || 'N/A',
          createdAt: t.createdAt || new Date().toISOString()
        }));
        setTemplates(sanitizedTemplates);
      } else {
        console.warn('Unexpected result format:', result);
        setMessage({ type: 'error', text: result?.error || 'Failed to load templates' });
        setTemplates([]);
      }
    } catch (err) {
      console.error('Error loading templates:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to load templates. Please check console for details.' });
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setEditName(template.name);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) {
      setMessage({ type: 'error', text: 'Template name cannot be empty' });
      return;
    }

    try {
      const updatedTemplate = {
        ...editingTemplate,
        name: editName.trim()
      };

      const result = await invoke('updateTemplate', {
        templateId: editingTemplate.id,
        templateData: updatedTemplate
      });

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setEditingTemplate(null);
        setEditName('');
        await loadTemplates();
      }
    } catch (err) {
      console.error('Error updating template:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to update template' });
    }
  };

  const handleDeleteClick = (template) => {
    setDeletingTemplate(template);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTemplate) return;

    try {
      const result = await invoke('deleteTemplate', {
        templateId: deletingTemplate.id
      });

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setIsDeleteModalOpen(false);
        setDeletingTemplate(null);
        await loadTemplates();
      }
    } catch (err) {
      console.error('Error deleting template:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to delete template' });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getFieldDisplayName = (fieldKey) => {
    const fieldNameMap = {
      'summary': 'Summary',
      'description': 'Description',
      'issuetype': 'Issue Type',
      'priority': 'Priority',
      'labels': 'Labels',
      'components': 'Components',
      'assignee': 'Assignee',
      'reporter': 'Reporter',
      'duedate': 'Due Date',
      'fixVersions': 'Fix Versions',
      'versions': 'Affects Versions',
      'environment': 'Environment'
    };
    return fieldNameMap[fieldKey] || fieldKey.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
  };

  const getFieldType = (fieldKey, fieldValue) => {
    if (fieldKey === 'description') return 'textarea';
    if (Array.isArray(fieldValue)) return 'array';
    if (typeof fieldValue === 'object' && fieldValue !== null) {
      if (fieldValue.name) return 'object-with-name';
      if (fieldValue.displayName) return 'object-with-display';
    }
    if (fieldKey.includes('date') || fieldKey === 'duedate') return 'date';
    return 'text';
  };

  const formatFieldValueForEditor = (fieldValue, fieldType) => {
    if (fieldValue === null || fieldValue === undefined) return '';
    if (fieldType === 'object-with-name') return fieldValue.name || '';
    if (fieldType === 'object-with-display') return fieldValue.displayName || '';
    if (fieldType === 'array') return fieldValue.map(item => 
      typeof item === 'object' ? (item.name || item.value || JSON.stringify(item)) : item
    ).join(', ');
    if (typeof fieldValue === 'object') return JSON.stringify(fieldValue);
    return String(fieldValue);
  };

  const parseFieldValueFromEditor = (editedValue, fieldType, originalValue) => {
    if (fieldType === 'array') {
      return editedValue.split(',').map(item => item.trim()).filter(item => item);
    }
    if (fieldType === 'object-with-name' && originalValue) {
      return { ...originalValue, name: editedValue };
    }
    if (fieldType === 'object-with-display' && originalValue) {
      return { ...originalValue, displayName: editedValue };
    }
    return editedValue;
  };

  const handleEditFields = (template) => {
    setFieldEditingTemplate(template);
    setSelectedFieldKey('');
    setSelectedFieldValue('');
    setFieldEditorType('text');
    setIsFieldModalOpen(true);
  };

  const handleFieldSelect = (fieldKey) => {
    if (!fieldEditingTemplate || !fieldEditingTemplate.fields || !fieldKey) return;
    
    const fieldValue = fieldEditingTemplate.fields[fieldKey];
    const fieldType = getFieldType(fieldKey, fieldValue);
    
    setSelectedFieldKey(fieldKey);
    setFieldEditorType(fieldType);
    setSelectedFieldValue(formatFieldValueForEditor(fieldValue, fieldType));
  };

  const handleSaveField = async () => {
    if (!fieldEditingTemplate || !selectedFieldKey) {
      setMessage({ type: 'error', text: 'Please select a field to edit' });
      return;
    }

    setSavingField(true);
    try {
      const originalValue = fieldEditingTemplate.fields[selectedFieldKey];
      const parsedValue = parseFieldValueFromEditor(selectedFieldValue, fieldEditorType, originalValue);
      
      const updatedFields = {
        ...fieldEditingTemplate.fields,
        [selectedFieldKey]: parsedValue
      };

      const updatedMetadata = { ...fieldEditingTemplate.metadata };
      if (selectedFieldKey === 'summary') {
        updatedMetadata.summary = typeof parsedValue === 'string' ? parsedValue : '';
      } else if (selectedFieldKey === 'priority') {
        updatedMetadata.priority = typeof parsedValue === 'object' && parsedValue?.name 
          ? parsedValue.name 
          : (typeof parsedValue === 'string' ? parsedValue : 'None');
      } else if (selectedFieldKey === 'issuetype') {
        updatedMetadata.issueType = typeof parsedValue === 'object' && parsedValue?.name 
          ? parsedValue.name 
          : (typeof parsedValue === 'string' ? parsedValue : 'Unknown');
      }

      const updatedTemplate = {
        ...fieldEditingTemplate,
        fields: updatedFields,
        metadata: updatedMetadata
      };

      const result = await invoke('updateTemplate', {
        templateId: fieldEditingTemplate.id,
        templateData: updatedTemplate
      });

      if (result.success) {
        setMessage({ type: 'success', text: `Field "${getFieldDisplayName(selectedFieldKey)}" updated successfully!` });
        setIsFieldModalOpen(false);
        setFieldEditingTemplate(null);
        setSelectedFieldKey('');
        setSelectedFieldValue('');
        await loadTemplates();
      }
    } catch (err) {
      console.error('Error updating field:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to update field' });
    } finally {
      setSavingField(false);
    }
  };

  const handleCloseFieldModal = () => {
    setIsFieldModalOpen(false);
    setFieldEditingTemplate(null);
    setSelectedFieldKey('');
    setSelectedFieldValue('');
    setFieldEditorType('text');
  };

  if (loading) {
    return (
      <Stack space="space.200">
        <Text>Loading templates...</Text>
      </Stack>
    );
  }

  const safeTemplates = Array.isArray(templates) ? templates : [];
  const currentEditingTemplate = safeTemplates.find(t => t.id === editingTemplateId);

  if (editingTemplateId && currentEditingTemplate) {
    console.log('Passing template to editor:', currentEditingTemplate);
    console.log('Template ID being passed:', currentEditingTemplate.id);
    return (
      <TemplateEditor
        template={currentEditingTemplate}
        onBack={() => {
          setEditingTemplateId(null);
          loadTemplates();
        }}
        onSave={async () => {
          await loadTemplates();
          const updatedTemplates = Array.isArray(templates) ? templates : [];
          const updatedTemplate = updatedTemplates.find(t => 
            t.name === currentEditingTemplate.name || 
            t.id === currentEditingTemplate.id ||
            t.sourceIssueKey === currentEditingTemplate.sourceIssueKey
          );
          if (updatedTemplate) {
            setEditingTemplateId(updatedTemplate.id);
          }
        }}
      />
    );
  }

  return (
    <Stack space="space.300">
      {message && (
        <SectionMessage 
          appearance={message.type === 'error' ? 'error' : 'success'}
        >
          <Text>{message.text}</Text>
        </SectionMessage>
      )}

      {safeTemplates.length === 0 ? (
        <Text>No templates found. Create your first template from an issue panel!</Text>
      ) : (
        <Stack space="space.200">
          {safeTemplates.map((template) => {
            if (!template) {
              return null;
            }
            return (
              <Stack key={template.id || Math.random()} space="space.100">
                <Text>{template.name || 'Unnamed Template'}</Text>
                <Inline space="space.050">
                  <Button 
                    appearance="primary"
                    onClick={() => {
                      setEditingTemplateId(template.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    appearance="danger"
                    onClick={() => {
                      console.log('Delete clicked for:', template.name);
                    }}
                  >
                    Delete
                  </Button>
                </Inline>
              </Stack>
            );
          })}
        </Stack>
      )}

      <Button 
        appearance="subtle" 
        onClick={loadTemplates}
        isDisabled={loading}
      >
        Refresh
      </Button>
    </Stack>
  );
};

ForgeReconciler.render(<App />);

