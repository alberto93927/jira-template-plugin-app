import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();

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

resolver.define('saveTemplate', async (req) => {
  const { templateData } = req.payload;

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
});

export const handler = resolver.getDefinitions();
