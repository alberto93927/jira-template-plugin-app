// Template CRUD operations resolver
// Handles create, read, update, and delete operations for templates

import { storage } from '@forge/api';

/**
 * Validation Functions
 */
const MAX_TEMPLATE_NAME_LENGTH = 200;
const MIN_TEMPLATE_NAME_LENGTH = 1;
const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/;

const validateTemplateName = (name) => {
  const trimmed = name?.trim();

  if (!trimmed) {
    return { valid: false, error: 'Template name cannot be empty' };
  }

  if (trimmed.length < MIN_TEMPLATE_NAME_LENGTH) {
    return { valid: false, error: 'Template name is too short' };
  }

  if (trimmed.length > MAX_TEMPLATE_NAME_LENGTH) {
    return { valid: false, error: `Template name must be ${MAX_TEMPLATE_NAME_LENGTH} characters or less` };
  }

  if (INVALID_CHARS.test(trimmed)) {
    return { valid: false, error: 'Template name contains invalid characters' };
  }

  return { valid: true, sanitized: trimmed };
};

const sanitizeTemplateNameForStorage = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 200);
};

const validateTemplateData = (template) => {
  if (!template) {
    return { valid: false, error: 'Template data is missing' };
  }

  if (typeof template !== 'object') {
    return { valid: false, error: 'Template data must be an object' };
  }

  if (!template.name || typeof template.name !== 'string') {
    return { valid: false, error: 'Template must have a valid name' };
  }

  if (!template.fields || typeof template.fields !== 'object') {
    return { valid: false, error: 'Template must have a fields object' };
  }

  try {
    JSON.stringify(template.fields);
  } catch (err) {
    if (err.message.includes('circular')) {
      return { valid: false, error: 'Template fields contain circular references' };
    }
  }

  return { valid: true };
};

const isStorageQuotaError = (error) => {
  const errorMessage = error?.message?.toLowerCase() || '';
  return errorMessage.includes('quota') ||
         errorMessage.includes('storage') ||
         errorMessage.includes('limit') ||
         errorMessage.includes('exceeded');
};

// Core fields that should always be saved, even if empty
const CORE_FIELDS = [
  'summary',
  'description',
  'issuetype',
  'priority',
  'labels',
  'components',
  'assignee',
  'reporter',
  'duedate',
  'fixVersions',
  'versions',
  'environment'
];

const isFieldEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    }
    return value.every(item => isFieldEmpty(item));
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return true;
    }
    return keys.every(key => isFieldEmpty(value[key]));
  }

  return false;
};

/**
 * Get all templates from storage
 */
export const getAllTemplates = async () => {
  try {
    const indexKey = 'template:index';
    const index = await storage.get(indexKey).catch(() => ({ keys: [] }));

    if (!index || !index.keys || index.keys.length === 0) {
      return {
        success: true,
        templates: []
      };
    }

    const templatePromises = index.keys.map(async (key) => {
      try {
        const template = await storage.get(key);
        if (!template) {
          return null;
        }

        const validation = validateTemplateData(template);
        if (!validation.valid) {
          console.warn(`Template ${key} is corrupted: ${validation.error}`);
          return null;
        }

        return {
          id: key,
          ...template
        };
      } catch (err) {
        console.warn(`Error fetching template ${key}: ${err.message}`);
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
    if (isStorageQuotaError(error)) {
      throw new Error('Storage quota exceeded. Please delete some templates or contact your administrator.');
    }
    throw new Error(`Failed to fetch templates: ${error.message}`);
  }
};

/**
 * Save a new template to storage
 */
export const saveTemplate = async ({ templateData }) => {
  if (!templateData || !templateData.name) {
    throw new Error('Template data and name are required');
  }

  const nameValidation = validateTemplateName(templateData.name);
  if (!nameValidation.valid) {
    throw new Error(nameValidation.error);
  }

  const dataValidation = validateTemplateData(templateData);
  if (!dataValidation.valid) {
    throw new Error(dataValidation.error);
  }

  // Filter fields using two-tier approach: always save core fields, only save non-empty others
  const filteredFields = {};
  if (templateData.fields && typeof templateData.fields === 'object') {
    for (const [fieldKey, fieldValue] of Object.entries(templateData.fields)) {
      const isCoreField = CORE_FIELDS.includes(fieldKey);
      if (isCoreField || !isFieldEmpty(fieldValue)) {
        filteredFields[fieldKey] = fieldValue;
      }
    }
  }

  try {
    const sanitizedName = sanitizeTemplateNameForStorage(nameValidation.sanitized);
    const storageKey = `template:${sanitizedName}`;

    await storage.set(storageKey, {
      ...templateData,
      name: nameValidation.sanitized,
      fields: filteredFields
    });

    const indexKey = 'template:index';
    let index = await storage.get(indexKey).catch(() => ({ keys: [] }));
    if (!index || !index.keys) {
      index = { keys: [] };
    }

    if (!index.keys.includes(storageKey)) {
      index.keys.push(storageKey);
      await storage.set(indexKey, index);
    }

    return {
      success: true,
      message: `Template "${nameValidation.sanitized}" saved successfully!`,
      templateId: storageKey
    };
  } catch (error) {
    if (isStorageQuotaError(error)) {
      throw new Error('Storage quota exceeded. Please delete some templates or contact your administrator.');
    }
    throw new Error(`Failed to save template: ${error.message}`);
  }
};

/**
 * Update an existing template
 */
export const updateTemplate = async ({ templateId, templateData }) => {
  if (!templateId || !templateData) {
    throw new Error('Template ID and data are required');
  }

  if (templateData.name) {
    const nameValidation = validateTemplateName(templateData.name);
    if (!nameValidation.valid) {
      throw new Error(nameValidation.error);
    }
    templateData.name = nameValidation.sanitized;
  }

  const dataValidation = validateTemplateData(templateData);
  if (!dataValidation.valid) {
    throw new Error(dataValidation.error);
  }

  try {
    let existingTemplate = await storage.get(templateId);
    let actualTemplateId = templateId;

    if (!existingTemplate) {
      const indexKey = 'template:index';
      const index = await storage.get(indexKey).catch(() => ({ keys: [] }));

      if (index.keys && index.keys.length > 0) {
        for (const key of index.keys) {
          try {
            const candidate = await storage.get(key);
            if (candidate) {
              if (templateData?.sourceIssueKey && candidate.sourceIssueKey === templateData.sourceIssueKey) {
                existingTemplate = candidate;
                actualTemplateId = key;
                break;
              }
              if (templateData?.createdAt && candidate.createdAt === templateData.createdAt) {
                existingTemplate = candidate;
                actualTemplateId = key;
                break;
              }
            }
          } catch (err) {
            // Continue searching
          }
        }

        if (!existingTemplate && index.keys.length === 1) {
          const key = index.keys[0];
          existingTemplate = await storage.get(key);
          actualTemplateId = key;
        }
      }
    }

    if (!existingTemplate) {
      throw new Error(`Template not found. TemplateId: ${templateId}`);
    }

    const existingValidation = validateTemplateData(existingTemplate);
    if (!existingValidation.valid) {
      throw new Error(`Existing template is corrupted: ${existingValidation.error}`);
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

    // Always update in place - storage key (ID) stays constant even if name changes
    try {
      await storage.set(actualTemplateId, updatedTemplate);

      return {
        success: true,
        message: `Template "${updatedTemplate.name}" updated successfully!`,
        templateId: actualTemplateId
      };
    } catch (storageError) {
      if (isStorageQuotaError(storageError)) {
        throw new Error('Storage quota exceeded. Please delete some templates or contact your administrator.');
      }
      throw storageError;
    }
  } catch (error) {
    if (isStorageQuotaError(error)) {
      throw new Error('Storage quota exceeded. Please delete some templates or contact your administrator.');
    }
    throw new Error(`Failed to update template: ${error.message}`);
  }
};

/**
 * Delete a template from storage
 */
export const deleteTemplate = async ({ templateId, templateName }) => {
  if (!templateId && !templateName) {
    throw new Error('Template ID or name is required');
  }

  try {
    let actualTemplateId = templateId;
    let existingTemplate = null;

    // Try to get template by ID first
    if (templateId) {
      existingTemplate = await storage.get(templateId);
      if (existingTemplate) {
        actualTemplateId = templateId;
      }
    }

    // If not found by ID, try generating storage key from name
    if (!existingTemplate && templateName) {
      const sanitizedName = sanitizeTemplateNameForStorage(templateName);
      const generatedKey = `template:${sanitizedName}`;
      const candidate = await storage.get(generatedKey);
      if (candidate) {
        existingTemplate = candidate;
        actualTemplateId = generatedKey;
      }
    }

    // If still not found, search all templates in index by name
    if (!existingTemplate && templateName) {
      const indexKey = 'template:index';
      const index = await storage.get(indexKey).catch(() => ({ keys: [] }));

      if (index && index.keys && index.keys.length > 0) {
        for (const key of index.keys) {
          try {
            const candidate = await storage.get(key);
            if (candidate && candidate.name === templateName) {
              existingTemplate = candidate;
              actualTemplateId = key;
              break;
            }
          } catch (err) {
            // Continue searching
          }
        }
      }
    }

    // Last resort: search all templates in index
    if (!existingTemplate) {
      const indexKey = 'template:index';
      const index = await storage.get(indexKey).catch(() => ({ keys: [] }));

      if (index && index.keys && index.keys.length > 0) {
        for (const key of index.keys) {
          try {
            const candidate = await storage.get(key);
            if (candidate) {
              // Match by ID if provided
              if (templateId && key === templateId) {
                existingTemplate = candidate;
                actualTemplateId = key;
                break;
              }
              // Match by name if provided (case-insensitive trim comparison)
              if (templateName && candidate.name &&
                  candidate.name.trim().toLowerCase() === templateName.trim().toLowerCase()) {
                existingTemplate = candidate;
                actualTemplateId = key;
                break;
              }
            }
          } catch (err) {
            // Continue searching
          }
        }
      }
    }

    if (!existingTemplate) {
      throw new Error(`Template not found${templateId ? ` with ID: ${templateId}` : ''}${templateName ? ` with name: ${templateName}` : ''}`);
    }

    await storage.delete(actualTemplateId);

    const verifyDelete = await storage.get(actualTemplateId);
    if (verifyDelete) {
      throw new Error('Template deletion failed - template still exists');
    }

    const indexKey = 'template:index';
    const index = await storage.get(indexKey).catch(() => ({ keys: [] }));
    if (index && index.keys) {
      const originalLength = index.keys.length;
      index.keys = index.keys.filter(key => key !== actualTemplateId);

      if (index.keys.length !== originalLength) {
        await storage.set(indexKey, index);
      }
    }

    return {
      success: true,
      message: 'Template deleted successfully!'
    };
  } catch (error) {
    throw new Error(`Failed to delete template: ${error.message}`);
  }
};
