// File path: src/frontend/index.jsx
import React, { useEffect, useState } from 'react';
import ForgeReconciler, {
  Text,
  Button,
  Stack,
  SectionMessage,
  Heading,
} from '@forge/react';
import { invoke, view } from '@forge/bridge';
import { CreateIssueModal } from '@forge/jira-bridge';

const ApplyTemplate = ({ issueId, projectId }) => {
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

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const allTemplates = await invoke('template.getAll');
        console.log('[TemplateCreation] Loaded templates:', allTemplates);
        setTemplates(allTemplates || []);
      } catch (e) {
        console.error('[TemplateCreation] Failed to load templates:', e);
        setError(`Failed to load templates: ${e.message || e}`);
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const handleCreateFromTemplate = async (templateId) => {
    try {
      console.log('[TemplateCreation] Creating issue from template:', templateId);

      // Fetch the full template data
      const template = await invoke('template.getById', { templateId });
      console.log('[TemplateCreation] Fetched template data:', template);

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

  if (loading) return <Text>Loading templates…</Text>;
  if (error) return <SectionMessage appearance="error">{error}</SectionMessage>;
  if (templates.length === 0) return <Text>No templates available.</Text>;

  return (
    <Stack space="space.400">
      <Heading as="h1">Create Issue from Template</Heading>
      <Text>Select a template to create a new issue with pre-filled fields.</Text>

      <Stack space="space.200">
        {templates.map((template) => (
          <Stack key={template.id} space="space.100" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Text weight="bold">{template.name}</Text>
            <Text size="small">{template.description || 'No description'}</Text>
            <Button
              appearance="primary"
              onClick={() => handleCreateFromTemplate(template.id)}
            >
              Create Issue
            </Button>
          </Stack>
        ))}
      </Stack>
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
  if (moduleKey === 'tmpl-create-uim') return <ApplyTemplate issueId={issueId} projectId={projectId} />;
  if (moduleKey === 'tmpl-apply') return <ApplyTemplate issueId={issueId} projectId={projectId} />;
  if (moduleKey === 'tmpl-project-library') return <TemplateCreation projectId={projectId} />;

  return <></>;
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
