// File path: src/frontend/index.jsx
import React, { useEffect, useState } from 'react';
import ForgeReconciler, {  
  Text,
  Button,
  Stack,
  SectionMessage,
} from '@forge/react';
import { invoke, view } from '@forge/bridge';

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

const ProjectLibrary = ({ projectId }) => {
  const [data, setData] = useState('Loading templates…');
  useEffect(() => { invoke('getText', { example: `list-${projectId}` }).then((d) => setData(String(d))); }, [projectId]);
  return <Text>Team Template Library for project {projectId}. {data}</Text>;
};

const ProjectSettings = () => {
  const [ctx, setCtx] = useState(null);
  const [msg, setMsg] = useState('Idle');
  const [issueTypes, setIssueTypes] = useState([]);
  const [projectId, setProjectId] = useState(null);

  // Grab context once
    useEffect(() => {
        const init = async () => {
            console.log('[ProjectSettings] Mounting and fetching context...');
            try {
                const initialContext = await view.getContext();
                console.log('[ProjectSettings] Initial context received:', initialContext);
                setCtx(initialContext);
            } catch (error) {
                console.error('[ProjectSettings] Failed to get initial context:', error);
                setMsg('Error: Could not load context from Jira.');
            }
        };
        init();
    }, []);

  if (!ctx) return <Text>Loading…</Text>;

  // Resolve projectId (works across project settings surfaces)
  useEffect(() => {
    const pid =
      ctx?.extension?.project?.id ??
      ctx?.platformContext?.projectId ??
      ctx?.project?.id;
    console.log('[ProjectSettings] Resolved projectId:', pid);
    setProjectId(pid);
  }, [ctx]);

  // Load issue types for this project
  useEffect(() => {
    (async () => {
      if (!projectId) return;
      try {
        const types = await invoke('jira.issueTypesForProject', { projectId: String(projectId) });
        console.log('[ProjectSettings] Fetched issue types:', types);
        setIssueTypes(types || []);
      } catch (e) {
        setMsg(`Failed to load issue types: ${e.message || e}`);
        console.error('[ProjectSettings] Failed to load issue types:', e);
      }
    })();
  }, [projectId]);

  return (
    <Stack space="space.200">
      <Text>Template Settings</Text>
      <Text>Detected projectId: {String(projectId || 'N/A')}</Text>

      <Text>Select an issue type to enable UIM on the Create dialog:</Text>
      <Stack space="space.100">
        {issueTypes.length === 0 && <Text>(No issue types found yet)</Text>}
        {issueTypes.map((t) => (
          <Button
            key={t.id}
            onClick={async () => {
              try {
                const res = await invoke('uim.createForProject', {
                  projectId: String(projectId),
                  issueTypeId: String(t.id),
                });
                setMsg(`Created UIM id ${res.id} for GIC on "${t.name}"`);
              } catch (e) {
                setMsg(`Create failed: ${e.message || e}`);
              }
            }}
          >
            Enable for: {t.name}
          </Button>
        ))}
      </Stack>

      <Button
        onClick={async () => {
          try {
            const list = await invoke('uim.list');
            const pid = String(projectId);
            const mine = (list?.values || []).filter((v) =>
              (v.contexts || []).some(
                (c) => String(c.projectId) === pid && c.viewType === 'GIC'
              )
            );

            const typeIds = Array.from(
              new Set(
                mine
                  .flatMap((v) => v.contexts || [])
                  .filter((c) => String(c.projectId) === pid && c.viewType === 'GIC')
                  .map((c) => c.issueTypeId)
              )
            );

            console.log('UIM entries for THIS project (GIC):', mine);
            console.log('Enabled issueTypeIds for GIC:', typeIds);
            setMsg(`Found ${mine.length} UIM entries for this project (see console).`);
          } catch (e) {
            setMsg(`List failed: ${e.message || e}`);
          }
        }}
      >
        List registered UIM entries
      </Button>

      <SectionMessage appearance="information">{msg}</SectionMessage>
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
  if (moduleKey === 'tmpl-project-library') return <ProjectLibrary projectId={projectId} />;
  if (moduleKey === 'tmpl-project-settings') return <ProjectSettings projectId={projectId} />;

  return <></>;
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
