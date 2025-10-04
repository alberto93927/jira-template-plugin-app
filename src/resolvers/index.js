// File path: src/resolvers/index.js
import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});

resolver.define('uim.createForProject', async ({ payload }) => {
  const { projectId, issueTypeId } = payload; // e.g., "10000"
  const body = {
    name: 'Team Templates – GIC',
    description: 'Apply template defaults in Create Issue',
    data: JSON.stringify({ feature: 'templates-v1' }), // optional config your UIM can read
    contexts: [{ projectId: String(projectId), issueTypeId: String(issueTypeId), viewType: 'GIC' }]
  };

  const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
  return await res.json(); // returns { id, self }
});

resolver.define('uim.list', async () => {
  const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications`);
  return await res.json(); // PageBean with values[]
});

resolver.define('uim.update', async ({ payload }) => {
  const { uiModificationId, contexts } = payload; // contexts = [{projectId, issueTypeId, viewType}, ...]
  const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications/${uiModificationId}`, {
    method: 'PUT',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Team Templates – GIC', contexts })
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return { ok: true };
});


resolver.define('jira.issueTypesForProject', async ({ payload }) => {
  const { projectId } = payload;
  const res = await api.asApp().requestJira(
    route`/rest/api/3/issue/createmeta?projectIds=${projectId}`
  );
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  const types = data?.projects?.[0]?.issuetypes?.map(({ id, name }) => ({ id, name })) ?? [];
  return types;
});

export const handler = resolver.getDefinitions();
