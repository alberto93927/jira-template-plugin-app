// Template resolver functions - provides template data to frontend
// Uses Atlassian Storage for persistent template management
// Falls back to hardcoded templates if storage is empty

import { storage } from '@forge/api';
import { TEMPLATES, getTemplateById } from '../data/templates';

/**
 * Get all available templates from storage
 * Falls back to hardcoded templates if storage is empty
 */
export const getTemplates = async () => {
  console.log('[templateResolver] Getting all templates from storage');

  try {
    const indexKey = 'template:index';
    const index = await storage.get(indexKey).catch(() => ({ keys: [] }));

    // If storage is empty, return hardcoded templates
    if (!index || !index.keys || index.keys.length === 0) {
      console.log('[templateResolver] ⚠️  USING HARDCODED TEMPLATES - Storage is empty');
      return TEMPLATES.map((template) => ({
        id: template.id,
        name: template.name,
        description: template.description,
        source: 'hardcoded', // PoC: Explicitly mark source
      }));
    }

    // Load templates from storage
    const templatePromises = index.keys.map(async (key) => {
      try {
        const template = await storage.get(key);
        if (!template) {
          console.warn(`[templateResolver] Template ${key} not found in storage`);
          return null;
        }

        return {
          id: key,
          name: template.name || 'Unnamed Template',
          description: template.metadata?.description ||
                      `Template from ${template.sourceIssueKey || 'unknown source'}`,
          source: 'storage', // PoC: Explicitly mark source
          createdAt: template.createdAt,
        };
      } catch (err) {
        console.warn(`[templateResolver] Error fetching template ${key}:`, err);
        return null;
      }
    });

    const templates = (await Promise.all(templatePromises))
      .filter(t => t !== null)
      .sort((a, b) => {
        // Sort by creation date if available
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return bTime - aTime;
      });

    console.log(`[templateResolver] ✅ USING STORAGE - Loaded ${templates.length} templates from Atlassian Storage`);
    return templates;

  } catch (error) {
    console.error('[templateResolver] Failed to fetch templates from storage:', error);
    // Fallback to hardcoded templates on error
    console.log('[templateResolver] ⚠️  USING HARDCODED TEMPLATES - Storage fetch failed');
    return TEMPLATES.map((template) => ({
      id: template.id,
      name: template.name,
      description: template.description,
      source: 'hardcoded', // PoC: Explicitly mark source
    }));
  }
};

/**
 * Get a specific template by ID from storage
 * Falls back to hardcoded templates if not found in storage
 */
export const getTemplate = async ({ templateId }) => {
  console.log('[templateResolver] Getting template:', templateId);

  try {
    // Try to get from storage first
    const template = await storage.get(templateId);

    if (template) {
      console.log('[templateResolver] ✅ STORAGE - Template found in Atlassian Storage:', templateId);
      // Return in format compatible with CreateIssueModal
      return {
        id: templateId,
        name: template.name,
        description: template.metadata?.description ||
                    `Template from ${template.sourceIssueKey || 'storage'}`,
        fields: template.fields || {},
        createdAt: template.createdAt,
        sourceIssueKey: template.sourceIssueKey,
        source: 'storage', // PoC: Explicitly mark source
      };
    }

    // If not in storage, try hardcoded templates
    console.log('[templateResolver] ⚠️  HARDCODED - Template not in storage, checking hardcoded fallback');
    const hardcodedTemplate = getTemplateById(templateId);
    if (hardcodedTemplate) {
      console.log('[templateResolver] ⚠️  HARDCODED - Found template in hardcoded data:', templateId);
      return {
        ...hardcodedTemplate,
        source: 'hardcoded', // PoC: Explicitly mark source
      };
    }

    throw new Error(`Template not found: ${templateId}`);

  } catch (error) {
    console.error('[templateResolver] Error getting template:', error);

    // Final fallback: try hardcoded templates
    const hardcodedTemplate = getTemplateById(templateId);
    if (hardcodedTemplate) {
      return hardcodedTemplate;
    }

    throw new Error(`Template not found: ${templateId}`);
  }
};

/**
 * Get template suggestions for a specific issue type
 * Currently returns all templates; can be filtered in the future
 */
export const getTemplateSuggestions = async ({ issueTypeName }) => {
  console.log('[templateResolver] Getting suggestions for issue type:', issueTypeName);
  // For now, just return all templates
  return getTemplates();
};

/**
 * Seed initial templates to storage (for testing/PoC)
 * This copies hardcoded templates to storage if storage is empty
 */
export const seedTemplates = async () => {
  console.log('[templateResolver] Seeding templates to storage');

  try {
    const indexKey = 'template:index';
    const index = await storage.get(indexKey).catch(() => ({ keys: [] }));

    // Only seed if storage is empty
    if (index && index.keys && index.keys.length > 0) {
      return {
        success: true,
        message: `Storage already has ${index.keys.length} template(s), skipping seed`,
        count: index.keys.length,
      };
    }

    const seededKeys = [];

    for (const template of TEMPLATES) {
      const storageKey = `template:${template.id}`;

      const storageTemplate = {
        name: template.name,
        createdAt: new Date().toISOString(),
        sourceIssueKey: 'SEED-TEMPLATE',
        fields: template.fields,
        metadata: {
          description: template.description,
          seeded: true,
        },
      };

      await storage.set(storageKey, storageTemplate);
      seededKeys.push(storageKey);
      console.log(`[templateResolver] Seeded template: ${storageKey}`);
    }

    // Update index
    await storage.set(indexKey, { keys: seededKeys });

    return {
      success: true,
      message: `Successfully seeded ${seededKeys.length} template(s) to storage`,
      count: seededKeys.length,
      templates: seededKeys,
    };

  } catch (error) {
    console.error('[templateResolver] Failed to seed templates:', error);
    throw new Error(`Failed to seed templates: ${error.message}`);
  }
};
