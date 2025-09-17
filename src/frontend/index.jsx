import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Button, Stack, SectionMessage } from '@forge/react';
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
