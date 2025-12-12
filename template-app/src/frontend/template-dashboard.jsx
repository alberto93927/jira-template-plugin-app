import React, { useEffect, useState } from 'react';
import ForgeReconciler, { 
  Text, 
  Stack, 
  Button,  
  SectionMessage,
  Inline
} from '@forge/react';
import { invoke } from '@forge/bridge';
import TemplateEditor from './template-editor.jsx';

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await invoke('getAllTemplates');
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
        setMessage({ type: 'error', text: result?.error || 'Failed to load templates' });
        setTemplates([]);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to load templates' });
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (template) => {
    if (!window.confirm(`JIRA template manager says: Are you sure you want to delete "${template.name}"?`)) {
      return;
    }

    try {
      const result = await invoke('deleteTemplate', {
        templateId: template.id,
        templateName: template.name
      });

      if (result && result.success) {
        setMessage({ type: 'success', text: result.message || 'Template deleted successfully!' });
        await loadTemplates();
      } else {
        setMessage({ type: 'error', text: result?.error || 'Failed to delete template' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete template' });
    }
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
                    onClick={() => handleDelete(template)}
                  >
                    Delete
                  </Button>
                </Inline>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

ForgeReconciler.render(<App />);

