// Template resolver functions - provides template data to frontend
// This integrates with the hardcoded template data and will be replaced
// with Atlassian Storage API calls once storage integration is implemented

import { TEMPLATES, getTemplateById } from '../data/templates';

/**
 * Get all available templates with their options (id, name, description)
 * Used by dropdown selectors and template lists
 */
export const getTemplates = async () => {
  console.log('[templateResolver] Getting all templates');
  return TEMPLATES.map((template) => ({
    id: template.id,
    name: template.name,
    description: template.description,
  }));
};

/**
 * Get a specific template by ID
 * Used to retrieve full template data including field values
 */
export const getTemplate = async ({ templateId }) => {
  console.log('[templateResolver] Getting template:', templateId);
  const template = getTemplateById(templateId);
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }
  return template;
};

/**
 * Get template suggestions for a specific issue type
 * Can be used to show context-specific template recommendations
 */
export const getTemplateSuggestions = async ({ issueTypeName }) => {
  console.log('[templateResolver] Getting suggestions for issue type:', issueTypeName);
  // Return all templates for now; can be filtered by issue type in the future
  return TEMPLATES.map((template) => ({
    id: template.id,
    name: template.name,
    description: template.description,
  }));
};