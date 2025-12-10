import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();


resolver.define('saveTemplate', async (req) => {
  const { templateData } = req.payload;

  if (!templateData || !templateData.name) {
    throw new Error('Template data and name are required');
  }

  try {
    //storage key for the template
    const storageKey = `template:${templateData.name.toLowerCase().replace(/\s+/g, '-')}`;
    await storage.set(storageKey, templateData);

    // Update the template index
    const indexKey = 'template:index';
    let index = await storage.get(indexKey).catch(() => ({ keys: [] }));
    if (!index || !index.keys) {
      index = { keys: [] };
    }
    
    // Add the key to index if it doesn't exist
    if (!index.keys.includes(storageKey)) {
      index.keys.push(storageKey);
      await storage.set(indexKey, index);
    }

    console.log(`Template saved: ${templateData.name}`);

    return {
      success: true,
      message: `Template "${templateData.name}" saved successfully!`,
      templateId: storageKey
    };

  } catch (error) {
    console.error(' Error saving template:', error);
    throw new Error(`Failed to save template: ${error.message}`);
  }
});

export const handler = resolver.getDefinitions();
