import React, { useState } from 'react';
import ForgeReconciler, {
  Text,
  Stack,
  Button,
  Textfield,
  SectionMessage,
  Inline
} from '@forge/react';
import { invoke } from '@forge/bridge';

const TemplateEditor = ({ template, onBack, onSave }) => {
  console.log('TemplateEditor received template:', template);
  console.log('Template ID:', template?.id);
  
  const [templateName, setTemplateName] = useState(template.name || '');
  const [selectedFieldKey, setSelectedFieldKey] = useState('');
  const [selectedFieldValue, setSelectedFieldValue] = useState('');
  const [fieldEditorType, setFieldEditorType] = useState('text');
  const [savingName, setSavingName] = useState(false);
  const [savingField, setSavingField] = useState(false);
  const [message, setMessage] = useState(null);
  const [showFieldList, setShowFieldList] = useState(false);

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

  const handleFieldSelect = (fieldKey) => {
    if (!template.fields || !fieldKey) return;
    
    const fieldValue = template.fields[fieldKey];
    const fieldType = getFieldType(fieldKey, fieldValue);
    
    setSelectedFieldKey(fieldKey);
    setFieldEditorType(fieldType);
    setSelectedFieldValue(formatFieldValueForEditor(fieldValue, fieldType));
  };

  const handleSaveName = async () => {
    if (!templateName.trim()) {
      setMessage({ type: 'error', text: 'Template name cannot be empty' });
      return;
    }

    setSavingName(true);
    setMessage(null);
    try {
      console.log('Saving template name. Template ID:', template.id);
      console.log('Template object:', template);
      console.log('New template name:', templateName.trim());
      
      const updatedTemplate = {
        ...template,
        name: templateName.trim(),
        sourceIssueKey: template.sourceIssueKey, 
        createdAt: template.createdAt 
      };

      const result = await invoke('updateTemplate', {
        templateId: template.id,
        templateData: updatedTemplate
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Template name updated successfully!' });
        if (onSave) {
          onSave();
        }
      }
    } catch (err) {
      console.error('Error updating template name:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to update template name' });
    } finally {
      setSavingName(false);
    }
  };

  const handleSaveField = async () => {
    if (!selectedFieldKey) {
      setMessage({ type: 'error', text: 'Please select a field to edit' });
      return;
    }

    setSavingField(true);
    setMessage(null);
    try {
      const originalValue = template.fields[selectedFieldKey];
      const parsedValue = parseFieldValueFromEditor(selectedFieldValue, fieldEditorType, originalValue);
      
      const updatedFields = {
        ...template.fields,
        [selectedFieldKey]: parsedValue
      };

      const updatedMetadata = { ...template.metadata };
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
        ...template,
        fields: updatedFields,
        metadata: updatedMetadata
      };

      console.log('Saving field. Template ID:', template.id);
      console.log('Updated template:', updatedTemplate);
      
      const result = await invoke('updateTemplate', {
        templateId: template.id,
        templateData: updatedTemplate
      });

      if (result.success) {
        setMessage({ type: 'success', text: `Field "${getFieldDisplayName(selectedFieldKey)}" updated successfully!` });
        setSelectedFieldKey('');
        setSelectedFieldValue('');
        if (onSave) {
          onSave();
        }
      }
    } catch (err) {
      console.error('Error updating field:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to update field' });
    } finally {
      setSavingField(false);
    }
  };

  const availableFields = template.fields ? Object.keys(template.fields) : [];

  return (
    <Stack space="space.300">
      <Button 
        appearance="subtle"
        onClick={onBack}
      >
        ← Back to Templates
      </Button>

      {message && (
        <SectionMessage 
          appearance={message.type === 'error' ? 'error' : 'success'}
        >
          <Text>{message.text}</Text>
        </SectionMessage>
      )}

      {/* Template Name Section */}
      <Stack space="space.200">
        <Text>Template Name:</Text>
        <Inline space="space.100">
          <Textfield
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name"
          />
          <Button 
            appearance="primary"
            onClick={handleSaveName}
            isDisabled={savingName || !templateName.trim()}
            isLoading={savingName}
          >
            Save Name
          </Button>
        </Inline>
      </Stack>

      {/* Field Editing Section */}
      <Stack space="space.200">
        {availableFields.length > 0 ? (
          <>
            <Stack space="space.050">
              <Inline space="space.050">
                <Textfield
                  value={selectedFieldKey ? getFieldDisplayName(selectedFieldKey) : '-- Select a field --'}
                  isReadOnly
                  label="Field to Edit"
                />
                <Button
                  appearance="subtle"
                  onClick={() => setShowFieldList(!showFieldList)}
                >
                  {showFieldList ? '▲' : '▼'}
                </Button>
              </Inline>
              
              {showFieldList && (
                <Stack space="space.025">
                  {availableFields.map((fieldKey) => (
                    <Button
                      key={fieldKey}
                      appearance={selectedFieldKey === fieldKey ? 'primary' : 'subtle'}
                      onClick={() => {
                        handleFieldSelect(fieldKey);
                        setShowFieldList(false);
                      }}
                      style={{ padding: '4px 8px', fontSize: '12px', minHeight: '28px' }}
                    >
                      {getFieldDisplayName(fieldKey)}
                    </Button>
                  ))}
                </Stack>
              )}
            </Stack>

            {selectedFieldKey && template.fields && template.fields[selectedFieldKey] !== undefined && (
              <Stack space="space.200">
                <Text>Current Value:</Text>
                <Textfield
                  value={formatFieldValueForEditor(
                    template.fields[selectedFieldKey],
                    getFieldType(selectedFieldKey, template.fields[selectedFieldKey])
                  )}
                  isReadOnly
                  label="Current Value"
                />

                <Text>New Value:</Text>
                {fieldEditorType === 'textarea' ? (
                  <Stack space="space.100">
                    <Text>New Value</Text>
                    <textarea
                      value={selectedFieldValue}
                      onChange={(e) => setSelectedFieldValue(e.target.value)}
                      rows={6}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '3px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        marginTop: '8px'
                      }}
                      placeholder={`Enter new value for ${getFieldDisplayName(selectedFieldKey)}`}
                    />
                  </Stack>
                ) : (
                  <Textfield
                    value={selectedFieldValue}
                    onChange={(e) => setSelectedFieldValue(e.target.value)}
                    label="New Value"
                    placeholder={`Enter new value for ${getFieldDisplayName(selectedFieldKey)}`}
                  />
                )}

                <Text>Field Type: {fieldEditorType}</Text>

                <Button 
                  appearance="primary" 
                  onClick={handleSaveField}
                  isDisabled={!selectedFieldKey || savingField}
                  isLoading={savingField}
                >
                  Save Field Changes
                </Button>
              </Stack>
            )}
          </>
        ) : (
          <Text>No fields available in this template.</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default TemplateEditor;

