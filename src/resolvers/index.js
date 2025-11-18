// File path: src/resolvers/index.js
import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});

resolver.define('uim.createForProject', async ({ payload }) => {
  const { projectId, issueTypeIds } = payload; // issueTypeIds is an array, e.g., ["10000", "10001"]

  if (!projectId || !issueTypeIds || issueTypeIds.length === 0) {
    throw new Error('projectId and issueTypeIds are required');
  }

  // Find any existing UIM for this feature
  const listRes = await api.asApp().requestJira(route`/rest/api/3/uiModifications`);
  if (!listRes.ok) throw new Error('Failed to list UIMs');
  const list = await listRes.json();
  const existing = (list?.values || []).find((v) => v.name === 'Team Templates – GIC');

  // Build contexts for all issue types
  const newContexts = issueTypeIds.map((issueTypeId) => ({
    projectId: String(projectId),
    issueTypeId: String(issueTypeId),
    viewType: 'GIC'
  }));

  if (existing) {
    // UPDATE existing UIM: merge new contexts with existing ones (prevent duplicates)
    const existingContexts = existing.contexts || [];

    // Create a map to deduplicate: key = "projectId:issueTypeId:viewType"
    const contextMap = new Map();
    existingContexts.forEach((c) => {
      const key = `${c.projectId}:${c.issueTypeId}:${c.viewType}`;
      contextMap.set(key, c);
    });
    newContexts.forEach((c) => {
      const key = `${c.projectId}:${c.issueTypeId}:${c.viewType}`;
      contextMap.set(key, c);
    });

    const contexts = Array.from(contextMap.values());

    const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications/${existing.id}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: existing.name,
        description: existing.description,
        contexts: contexts
      })
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status} ${res.statusText}: ${await res.text()}`);

    const checkListRes = await api.asApp().requestJira(route`/rest/api/3/uiModifications`);
    const checkList = await checkListRes.json();
    const updatedUim = (checkList?.values || []).find(v => v.id === existing.id);
    console.log('[uim.createForProject] UIM updated:', JSON.stringify(updatedUim, null, 2));

    return { id: existing.id, updated: true, ...updatedUim };

  } else {
    // CREATE new UIM with all issue types
    const body = {
      name: 'Team Templates – GIC',
      description: 'Apply template defaults in Create Issue',
      data: JSON.stringify({ feature: 'templates-v1' }),
      contexts: newContexts
    };

    const res = await api.asApp().requestJira(route`/rest/api/3/uiModifications`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`Create failed: ${res.status} ${res.statusText}: ${await res.text()}`);
    const createdUim = await res.json();

    console.log('[uim.createForProject] UIM created:', JSON.stringify(createdUim, null, 2));
    return createdUim;
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

// In-memory storage for template selections during Create Issue flow
// Key: `project:issueType`, Value: templateId
// This is temporary storage cleared between sessions
const templateSelectionCache = new Map();

resolver.define('customfield.saveTemplateSelection', async ({ payload, context }) => {
  const { templateId } = payload;
  const projectId = context?.extension?.project?.id;
  const issueTypeId = context?.extension?.issueType?.id;

  if (!projectId || !issueTypeId) {
    console.warn('[customfield.saveTemplateSelection] Missing context info');
    return { ok: false, error: 'Missing project or issue type context' };
  }

  const cacheKey = `${projectId}:${issueTypeId}`;
  console.log('[customfield.saveTemplateSelection] Saving template selection:', cacheKey, '=', templateId);
  templateSelectionCache.set(cacheKey, templateId);

  return { ok: true, cacheKey, templateId };
});

resolver.define('customfield.getTemplateSelection', async ({ context }) => {
  const projectId = context?.extension?.project?.id;
  const issueTypeId = context?.extension?.issueType?.id;

  if (!projectId || !issueTypeId) {
    console.warn('[customfield.getTemplateSelection] Missing context info');
    return null;
  }

  const cacheKey = `${projectId}:${issueTypeId}`;
  const templateId = templateSelectionCache.get(cacheKey);
  console.log('[customfield.getTemplateSelection] Retrieved from cache:', cacheKey, '=', templateId);

  return templateId || null;
});

// Template management resolvers
resolver.define('template.getAll', async () => {
  const { getTemplates } = await import('./templateResolver');
  return getTemplates();
});

resolver.define('template.getById', async ({ payload }) => {
  const { templateId } = payload;
  const { getTemplate } = await import('./templateResolver');
  return getTemplate({ templateId });
});

resolver.define('template.getSuggestions', async ({ payload }) => {
  const { issueTypeName } = payload;
  const { getTemplateSuggestions } = await import('./templateResolver');
  return getTemplateSuggestions({ issueTypeName });
});

export const handler = resolver.getDefinitions();
