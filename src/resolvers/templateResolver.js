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
      console.log('[templateResolver] Storage is empty, using hardcoded templates');
      return TEMPLATES.map((template) => ({
        id: template.id,
        name: template.name,
        description: template.description,
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

    console.log(`[templateResolver] Loaded ${templates.length} templates from storage`);
    return templates;

  } catch (error) {
    console.error('[templateResolver] Failed to fetch templates from storage:', error);
    // Fallback to hardcoded templates on error
    console.log('[templateResolver] Falling back to hardcoded templates');
    return TEMPLATES.map((template) => ({
      id: template.id,
      name: template.name,
      description: template.description,
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
      console.log('[templateResolver] Template found in storage:', templateId);
      // Return in format compatible with CreateIssueModal
      return {
        id: templateId,
        name: template.name,
        description: template.metadata?.description ||
                    `Template from ${template.sourceIssueKey || 'storage'}`,
        fields: template.fields || {},
        createdAt: template.createdAt,
        sourceIssueKey: template.sourceIssueKey,
      };
    }

    // If not in storage, try hardcoded templates
    console.log('[templateResolver] Template not in storage, checking hardcoded fallback');
    const hardcodedTemplate = getTemplateById(templateId);
    if (hardcodedTemplate) {
      console.log('[templateResolver] Found template in hardcoded data:', templateId);
      return hardcodedTemplate;
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

