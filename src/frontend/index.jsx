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
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const allTemplates = await invoke('template.getAll');

      // PoC: Log source information
      const sources = allTemplates?.reduce((acc, t) => {
        acc[t.source || 'unknown'] = (acc[t.source || 'unknown'] || 0) + 1;
        return acc;
      }, {});

      if (sources.storage) {
        console.log(`[TemplateCreation] ✅ STORAGE - Loaded ${sources.storage} template(s) from Atlassian Storage`);
      }
      if (sources.hardcoded) {
        console.log(`[TemplateCreation] ⚠️  HARDCODED - Loaded ${sources.hardcoded} template(s) from hardcoded fallback`);
      }

      console.log('[TemplateCreation] Template details:', allTemplates);
      setTemplates(allTemplates || []);
    } catch (e) {
      console.error('[TemplateCreation] Failed to load templates:', e);
      setError(`Failed to load templates: ${e.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleSeedStorage = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const response = await invoke('template.seedStorage');
      console.log('[TemplateCreation] Seed result:', response);
      setSeedResult({ type: 'success', data: response });
      // Reload templates after seeding
      await loadTemplates();
    } catch (err) {
      console.error('[TemplateCreation] Seed failed:', err);
      setSeedResult({ type: 'error', message: err.message || 'Failed to seed templates' });
    } finally {
      setSeeding(false);
    }
  };

  const handleCreateFromTemplate = async (templateId) => {
    try {
      console.log('[TemplateCreation] Creating issue from template:', templateId);

      // Fetch the full template data
      const template = await invoke('template.getById', { templateId });

      // PoC: Log source of template being used
      if (template.source === 'storage') {
        console.log(`[TemplateCreation] ✅ STORAGE - Using template from Atlassian Storage: ${template.name}`);
      } else if (template.source === 'hardcoded') {
        console.log(`[TemplateCreation] ⚠️  HARDCODED - Using template from hardcoded fallback: ${template.name}`);
      }

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

  return (
    <Stack space="space.400">
      <Heading as="h1">Team Template Library</Heading>
      <Text>Select a template to create a new issue with pre-filled fields.</Text>

      {/* PoC: Storage Seed Button */}
      <SectionMessage appearance="information">
        <Stack space="space.200">
          <Text weight="bold">PoC Testing: Seed Templates to Storage</Text>
          <Button
            appearance="default"
            onClick={handleSeedStorage}
            isDisabled={seeding}
          >
            {seeding ? 'Seeding...' : 'Seed Storage'}
          </Button>
        </Stack>
      </SectionMessage>

      {seedResult && (
        <SectionMessage appearance={seedResult.type === 'success' ? 'success' : 'error'}>
          {seedResult.type === 'success' ? (
            <Text>✅ {seedResult.data.message} ({seedResult.data.count} templates)</Text>
          ) : (
            <Text>❌ {seedResult.message}</Text>
          )}
        </SectionMessage>
      )}

      {loading && <Text>Loading templates…</Text>}
      {error && <SectionMessage appearance="error">{error}</SectionMessage>}

      {!loading && !error && templates.length === 0 && (
        <SectionMessage appearance="warning">
          <Text>No templates available. Try seeding storage first.</Text>
        </SectionMessage>
      )}

      {!loading && templates.length > 0 && (
        <Stack space="space.200">
          {templates.map((template) => (
            <Stack key={template.id} space="space.100" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <Stack space="space.050">
                <Text weight="bold">{template.name}</Text>
                {/* PoC: Show source badge */}
                <Text size="small" style={{
                  color: template.source === 'storage' ? '#36B37E' : '#FF991F',
                  fontWeight: 'bold',
                  fontSize: '10px'
                }}>
                  {template.source === 'storage' ? '✅ FROM STORAGE' : '⚠️  FROM HARDCODED FALLBACK'}
                </Text>
              </Stack>
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
