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

  useEffect(() => { view.getContext().then(setCtx); }, []);

  useEffect(() => {
    const load = async () => {
      if (!ctx) return;
      const projectId =
        ctx?.extension?.project?.id ??
        ctx?.platformContext?.projectId ??
        ctx?.project?.id;
      if (!projectId) return;
      try {
        const types = await invoke('jira.issueTypesForProject', { projectId: String(projectId) });
        setIssueTypes(types || []);
      } catch (e) {
        setMsg(`Failed to load issue types: ${e.message || e}`);
      }
    };
    load();
  }, [ctx]);

  if (!ctx) return <Text>Loading…</Text>;

  const projectId =
    ctx?.extension?.project?.id ??
    ctx?.platformContext?.projectId ??
    ctx?.project?.id;

  return (
    <Stack space="space.200">
      <Text>Template Settings</Text>
      <Text>Detected projectId: {String(projectId || 'N/A')}</Text>

      <Text>Select an issue type to enable UIM on the Create dialog:</Text>
      <Stack space="space.100">
        {issueTypes.length === 0 && <Text>(No issue types found yet)</Text>}
        {issueTypes.map(t => (
          <Button key={t.id} onClick={async () => {
            try {
              const res = await invoke('uim.createForProject', {
                projectId: String(projectId),
                issueTypeId: String(t.id),
              });
              setMsg(`Created UIM id ${res.id} for GIC on "${t.name}"`);
            } catch (e) {
              setMsg(`Create failed: ${e.message || e}`);
            }
          }}>
            Enable for: {t.name}
          </Button>
        ))}
      </Stack>

      <Button onClick={async () => {
        const list = await invoke('uim.list');
        console.log('UIM list:', list);
        setMsg('Listed UIM entries — check console');
      }}>
        List registered UIM entries
      </Button>

      <SectionMessage appearance="information">{msg}</SectionMessage>
    </Stack>
  );
};

const App = () => {
  const [ctx, setCtx] = useState(null);

  useEffect(() => { view.getContext().then(setCtx); }, []);
  if (!ctx) return <Text>Loading…</Text>;

  // Context commonly exposes the moduleKey and platform info
  const moduleKey = ctx.moduleKey;
  const platform = ctx.platformContext || {};
  const projectId = platform.projectId;
  const issueId = platform.issueId;

  // Simple router by module key (keeps one bundle for all modules)
  if (moduleKey === 'tmpl-apply') return <ApplyTemplate issueId={issueId} projectId={projectId} />;
  if (moduleKey === 'tmpl-project-library') return <ProjectLibrary projectId={projectId} />;
  if (moduleKey === 'tmpl-project-settings') return <ProjectSettings projectId={projectId} />;

  return (
    <>
      <Text>Hello world!</Text>
      <Text>{`Module: ${moduleKey || 'unknown'}`}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
