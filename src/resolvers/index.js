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

// Storage seed resolver (for PoC testing)
resolver.define('template.seedStorage', async () => {
  const { seedTemplates } = await import('./templateResolver');
  return seedTemplates();
});

export const handler = resolver.getDefinitions();
