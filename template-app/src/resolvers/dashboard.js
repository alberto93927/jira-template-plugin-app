import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();

// Get all templates
resolver.define('getAllTemplates', async () => {
  try {
    // Get the template index
    const indexKey = 'template:index';
    const index = await storage.get(indexKey).catch(() => ({ keys: [] }));
    
    if (!index || !index.keys || index.keys.length === 0) {
      return {
        success: true,
        templates: []
      };
    }

    // Fetch all templates from the index
    const templatePromises = index.keys.map(async (key) => {
      try {
        const template = await storage.get(key);
        if (template) {
          return {
            id: key,
            ...template
          };
        }
        return null;
      } catch (err) {
        console.warn(`Failed to fetch template ${key}:`, err);
        return null;
      }
    });

    const templates = (await Promise.all(templatePromises))
      .filter(template => template !== null);

    return {
      success: true,
      templates: templates.sort((a, b) => 
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )
    };
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw new Error(`Failed to fetch templates: ${error.message}`);
  }
});

// Update a template
resolver.define('updateTemplate', async (req) => {
  const { templateId, templateData } = req.payload;

  if (!templateId || !templateData) {
    throw new Error('Template ID and data are required');
  }

  try {
    console.log('updateTemplate called with templateId:', templateId);
    console.log('templateData:', templateData);
    
    let existingTemplate = await storage.get(templateId);
    let actualTemplateId = templateId;
    
    // If template not found with the given ID, try to find it in the index
    // This handles cases where the name changed but frontend still has old ID
    if (!existingTemplate) {
      const indexKey = 'template:index';
      const index = await storage.get(indexKey).catch(() => ({ keys: [] }));
      console.log('Template not found with ID:', templateId);
      console.log('Checking index keys:', index?.keys);
      console.log('Template data being sent:', templateData);
      
      // Try to find template by checking all keys in the index
      // This handles cases where the frontend has a stale ID
      if (index.keys && index.keys.length > 0) {
        for (const key of index.keys) {
          try {
            const candidate = await storage.get(key);
            if (candidate) {
              // Match by sourceIssueKey (most reliable identifier)
              if (templateData && templateData.sourceIssueKey && candidate.sourceIssueKey === templateData.sourceIssueKey) {
                console.log('Found template by sourceIssueKey match:', key);
                existingTemplate = candidate;
                actualTemplateId = key;
                break;
              }
              // Match by createdAt if available (unique identifier)
              if (templateData && templateData.createdAt && candidate.createdAt === templateData.createdAt) {
                console.log('Found template by createdAt match:', key);
                existingTemplate = candidate;
                actualTemplateId = key;
                break;
              }
            }
          } catch (err) {
            console.warn(`Error checking template ${key}:`, err);
          }
        }
        
        // If still not found and there's only one template, use it
        if (!existingTemplate && index.keys.length === 1) {
          const key = index.keys[0];
          console.log('Only one template found, using it:', key);
          existingTemplate = await storage.get(key);
          actualTemplateId = key;
        }
      }
    }
    
    console.log('Existing template from storage:', existingTemplate);
    console.log('Using templateId:', actualTemplateId);
    
    if (!existingTemplate) {
      const indexKey = 'template:index';
      const index = await storage.get(indexKey).catch(() => ({ keys: [] }));
      throw new Error(`Template not found. TemplateId: ${templateId}, Available keys: ${JSON.stringify(index?.keys || [])}`);
    }

    const updatedTemplate = {
      ...existingTemplate,
      ...templateData,
      createdAt: existingTemplate.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!updatedTemplate.name) {
      updatedTemplate.name = existingTemplate.name;
    }

    // If name changed, we need to update the storage key
    if (existingTemplate.name && existingTemplate.name !== updatedTemplate.name) {
      const newStorageKey = `template:${updatedTemplate.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Save to new key
      await storage.set(newStorageKey, updatedTemplate);
      
      // Update the template index
      const indexKey = 'template:index';
      const index = await storage.get(indexKey).catch(() => ({ keys: [] }));
      if (!index || !index.keys) {
        index.keys = [];
      }
      
      // Remove old key and add new key
      index.keys = index.keys.filter(key => key !== actualTemplateId);
      if (!index.keys.includes(newStorageKey)) {
        index.keys.push(newStorageKey);
      }
      await storage.set(indexKey, index);
      
      // Delete old key (only if it's different from new key)
      if (actualTemplateId !== newStorageKey) {
        await storage.delete(actualTemplateId);
      }
      
      return {
        success: true,
        message: `Template "${updatedTemplate.name}" updated successfully!`,
        templateId: newStorageKey
      };
    } else {
      // Just update the existing template using the actual template ID
      await storage.set(actualTemplateId, updatedTemplate);
      
      return {
        success: true,
        message: `Template "${updatedTemplate.name}" updated successfully!`,
        templateId: actualTemplateId
      };
    }
  } catch (error) {
    console.error('Error updating template:', error);
    throw new Error(`Failed to update template: ${error.message}`);
  }
});

// Delete a template
resolver.define('deleteTemplate', async (req) => {
  const { templateId } = req.payload;

  if (!templateId) {
    throw new Error('Template ID is required');
  }

  try {
    // Delete the template
    await storage.delete(templateId);
    
    // Update the template index
    const indexKey = 'template:index';
    const index = await storage.get(indexKey).catch(() => ({ keys: [] }));
    if (index && index.keys) {
      index.keys = index.keys.filter(key => key !== templateId);
      await storage.set(indexKey, index);
    }
    
    return {
      success: true,
      message: 'Template deleted successfully!'
    };
  } catch (error) {
    console.error('Error deleting template:', error);
    throw new Error(`Failed to delete template: ${error.message}`);
  }
});

export const handler = resolver.getDefinitions();

