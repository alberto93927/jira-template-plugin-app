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

  // Find any existing UIM for this feature
  const listRes = await api.asApp().requestJira(route`/rest/api/3/uiModifications`);
  if (!listRes.ok) throw new Error('Failed to list UIMs');
  const list = await listRes.json();
  const existing = (list?.values || []).find((v) => v.name === 'Team Templates – GIC');

  if (existing) {
    // UPDATE existing UIM
    const newContext = { projectId: String(projectId), issueTypeId: String(issueTypeId), viewType: 'GIC' };
    const existingContexts = existing.contexts || [];
    
    // Check if this exact context already exists to prevent duplicates
    const contextExists = existingContexts.some(c => 
        c.projectId === newContext.projectId && 
        c.issueTypeId === newContext.issueTypeId && 
        c.viewType === newContext.viewType);
    const contexts = contextExists ? existingContexts : [...existingContexts, newContext];

    const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications/${existing.id}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: {
        name: existing.name,
        description: existing.description,
        data: existing.data,
        contexts: contexts
      }
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status} ${res.statusText}: ${await res.text()}`);
    return { id: existing.id, updated: true };

  } else {
    // CREATE new UIM
    const body = {
      name: 'Team Templates – GIC',
      description: 'Apply template defaults in Create Issue',
      data: JSON.stringify({ feature: 'templates-v1' }), // optional config your UIM can read
      contexts: [{ projectId: String(projectId), issueTypeId: String(issueTypeId), viewType: 'GIC' }]
    };

    const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: body
    });

    if (!res.ok) throw new Error(`Create failed: ${res.status} ${res.statusText}: ${await res.text()}`);
    return await res.json(); // returns { id, self }
  }
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
