// File path: src/resolvers/index.js
import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
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

// Template CRUD resolvers
resolver.define('getAllTemplates', async () => {
  const { getAllTemplates } = await import('./templateCrudResolver');
  return getAllTemplates();
});

resolver.define('saveTemplate', async ({ payload }) => {
  const { templateData } = payload;
  const { saveTemplate } = await import('./templateCrudResolver');
  return saveTemplate({ templateData });
});

resolver.define('updateTemplate', async ({ payload }) => {
  const { templateId, templateData } = payload;
  const { updateTemplate } = await import('./templateCrudResolver');
  return updateTemplate({ templateId, templateData });
});

resolver.define('deleteTemplate', async ({ payload }) => {
  const { templateId, templateName } = payload;
  const { deleteTemplate } = await import('./templateCrudResolver');
  return deleteTemplate({ templateId, templateName });
});

export const handler = resolver.getDefinitions();
