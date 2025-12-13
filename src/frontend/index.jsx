// File path: src/frontend/index.jsx
import React, { useEffect, useState } from 'react';
import ForgeReconciler, {
  Text,
  Button,
  Stack,
  SectionMessage,
  Inline,
} from '@forge/react';
import { invoke, view } from '@forge/bridge';
import { CreateIssueModal } from '@forge/jira-bridge';
import TemplateSaver from './template-saver.jsx';
import TemplateEditor from './template-editor.jsx';

const ApplyTemplate = ({ issueId }) => {
  const [msg, setMsg] = useState('Pick a template…');
  return (
    <Stack space="space.200">
      <Text>Apply a template to issue {issueId}</Text>
      <Button onClick={async () => {
        // later: invoke('applyTemplate', { issueId, templateId })
        const data = await invoke('getText', { example: 'apply-click' });
        setMsg(String(data));
      }}>Apply</Button>
      <SectionMessage appearance="information">{msg}</SectionMessage>
    </Stack>
  );
};

const TemplateCreation = ({ projectId }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [message, setMessage] = useState(null);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Use getAllTemplates for full template data including metadata
      const result = await invoke('getAllTemplates');

      if (result && result.success && Array.isArray(result.templates)) {
        const sanitizedTemplates = result.templates.map(t => ({
          id: t.id,
          name: t.name || 'Unnamed Template',
          description: t.metadata?.description || `Template from ${t.sourceIssueKey || 'unknown'}`,
          fields: t.fields || {},
          metadata: t.metadata || {},
          sourceIssueKey: t.sourceIssueKey || 'N/A',
          createdAt: t.createdAt || new Date().toISOString()
        }));

        console.log(`[TemplateCreation] Loaded ${sanitizedTemplates.length} template(s)`);
        setTemplates(sanitizedTemplates);
      } else {
        setError(result?.error || 'Failed to load templates');
        setTemplates([]);
      }
    } catch (e) {
      console.error('[TemplateCreation] Failed to load templates:', e);
      setError(`Failed to load templates: ${e.message || e}`);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleDelete = async (template) => {
    if (!window.confirm(`Are you sure you want to delete "${template.name}"?`)) {
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

  const handleCreateFromTemplate = async (templateId) => {
    try {
      console.log('[TemplateCreation] Creating issue from template:', templateId);

      // Fetch the full template data
      const template = await invoke('template.getById', { templateId });
      console.log('[TemplateCreation] Using template from storage:', template.name);

      if (!template) {
        setError('Template not found');
        return;
      }

      // Open CreateIssueModal pre-filled with template data
      const modal = new CreateIssueModal({
        onClose: (payload) => {
          console.log('[TemplateCreation] Issue creation modal closed:', payload);
          if (payload?.issues?.length > 0) {
            setError(null);
            console.log('[TemplateCreation] Issues created successfully:', payload.issues);
          }
        },
        context: {
          projectId,
          issueTypeId: template.fields.issuetype,
          summary: template.fields.summary,
          description: template.fields.description,
          priority: template.fields.priority,
        }
      });

      await modal.open();
    } catch (e) {
      console.error('[TemplateCreation] Error creating issue from template:', e);
      setError(`Error: ${e.message || e}`);
    }
  };

  // If editing a template, show the editor
  const currentEditingTemplate = templates.find(t => t.id === editingTemplateId);
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
          const updatedTemplates = templates;
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
    <Stack space="space.400">
      <Text>Browse, manage, and create issues from templates.</Text>

      {message && (
        <SectionMessage appearance={message.type === 'error' ? 'error' : 'success'}>
          <Text>{message.text}</Text>
        </SectionMessage>
      )}

      {loading && <Text>Loading templates…</Text>}
      {error && <SectionMessage appearance="error">{error}</SectionMessage>}

      {!loading && !error && templates.length === 0 && (
        <SectionMessage appearance="information">
          <Text>No templates found. Create your first template by using "Save as template" from any issue!</Text>
        </SectionMessage>
      )}

      {!loading && templates.length > 0 && (
        <Stack space="space.200">
          {templates.map((template) => (
            <Stack key={template.id} space="space.100" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <Text weight="bold">{template.name}</Text>
              <Text size="small">Source: {template.sourceIssueKey}</Text>
              <Text size="small">Created: {new Date(template.createdAt).toLocaleDateString()}</Text>
              <Stack space="space.100">
                <Button
                  appearance="primary"
                  onClick={() => handleCreateFromTemplate(template.id)}
                >
                  Create Issue
                </Button>
                <Inline space="space.050">
                  <Button
                    appearance="default"
                    onClick={() => setEditingTemplateId(template.id)}
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
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const App = () => {
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const init = async () => {
        console.log('[App] Mounting and fetching context...');
        try {
            const initialContext = await view.getContext();
            console.log('[App] Initial context received:', initialContext);
            setCtx(initialContext);
        } catch (error) {
            console.error('[App] Failed to get initial context:', error);
        }
    };
    init();
  }, []);

  if (!ctx) return <Text>Loading…</Text>;

  // Context commonly exposes the moduleKey and platform info
  const moduleKey = ctx.moduleKey;
  const platform = ctx.platformContext || {};
  const projectId = platform.projectId;
  const issueId = platform.issueId;

  // Simple router by module key (keeps one bundle for all modules)
  if (moduleKey === 'tmpl-create-uim') return <ApplyTemplate issueId={issueId} />;
  if (moduleKey === 'tmpl-apply') return <ApplyTemplate issueId={issueId} />;
  if (moduleKey === 'tmpl-project-library') return <TemplateCreation projectId={projectId} />;
  if (moduleKey === 'tmpl-save') return <TemplateSaver issueId={issueId} />;

  return <></>;
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
