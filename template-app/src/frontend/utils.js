// Template name validation constants
const MAX_TEMPLATE_NAME_LENGTH = 200;
const MIN_TEMPLATE_NAME_LENGTH = 1;
const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/;

// Template name validation
export const validateTemplateName = (name) => {
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

export const sanitizeTemplateNameForStorage = (name) => {
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

export const validateTemplateData = (template) => {
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

export const validateFieldValue = (fieldValue, fieldType) => {
  if (fieldValue === null || fieldValue === undefined) {
    return { valid: true, sanitized: null };
  }
  
  const MAX_FIELD_SIZE = 1000000;
  try {
    const serialized = JSON.stringify(fieldValue);
    if (serialized.length > MAX_FIELD_SIZE) {
      return { 
        valid: false, 
        error: `Field value is too large (${Math.round(serialized.length / 1024)}KB). Maximum size is ${Math.round(MAX_FIELD_SIZE / 1024)}KB` 
      };
    }
  } catch (err) {
    if (err.message.includes('circular')) {
      return { valid: false, error: 'Field value contains circular references' };
    }
  }
  
  if (Array.isArray(fieldValue)) {
    if (fieldValue.length > 10000) {
      return { valid: false, error: 'Array field contains too many items (maximum 10,000)' };
    }
    const checkDepth = (arr, depth = 0) => {
      if (depth > 10) return false;
      return arr.every(item => !Array.isArray(item) || checkDepth(item, depth + 1));
    };
    if (!checkDepth(fieldValue)) {
      return { valid: false, error: 'Array field is too deeply nested (maximum depth 10)' };
    }
  }
  
  if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
    const checkObjectDepth = (obj, depth = 0) => {
      if (depth > 20) return false;
      return Object.values(obj).every(val => 
        typeof val !== 'object' || val === null || checkObjectDepth(val, depth + 1)
      );
    };
    if (!checkObjectDepth(fieldValue)) {
      return { valid: false, error: 'Object field is too deeply nested (maximum depth 20)' };
    }
  }
  
  return { valid: true, sanitized: fieldValue };
};

// Core fields that should always be saved, even if empty
export const CORE_FIELDS = [
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

// Check if a field value is considered empty
export const isFieldEmpty = (value) => {
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
    // Check if array only contains empty values
    return value.every(item => isFieldEmpty(item));
  }
  
  if (typeof value === 'object') {
    // Check if object has no meaningful properties
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return true;
    }
    // Check if all properties are empty
    return keys.every(key => isFieldEmpty(value[key]));
  }
  
  return false;
};

export const getFieldDisplayName = (fieldKey) => {
  const fieldNameMap = {
    'summary': 'Summary',
    'description': 'Description',
    'issuetype': 'Issue Type',
    'priority': 'Priority',
    'labels': 'Labels',
    'components': 'Components',
    'assignee': 'Assignee',
    'reporter': 'Reporter',
    'duedate': 'Due Date',
    'fixVersions': 'Fix Versions',
    'versions': 'Affects Versions',
    'environment': 'Environment'
  };
  return fieldNameMap[fieldKey] || fieldKey.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
};

export const getFieldType = (fieldKey, fieldValue) => {
  if (fieldKey === 'description') return 'textarea';
  if (Array.isArray(fieldValue)) return 'array';
  if (typeof fieldValue === 'object' && fieldValue !== null) {
    if (fieldValue.name) return 'object-with-name';
    if (fieldValue.displayName) return 'object-with-display';
  }
  if (fieldKey.includes('date') || fieldKey === 'duedate') return 'date';
  return 'text';
};

export const formatFieldValueForEditor = (fieldValue, fieldType) => {
  if (fieldValue === null || fieldValue === undefined) return '';
  if (fieldType === 'object-with-name') return fieldValue.name || '';
  if (fieldType === 'object-with-display') return fieldValue.displayName || '';
  if (fieldType === 'array') return fieldValue.map(item => 
    typeof item === 'object' ? (item.name || item.value || JSON.stringify(item)) : item
  ).join(', ');
  if (typeof fieldValue === 'object') return JSON.stringify(fieldValue);
  return String(fieldValue);
};

export const parseFieldValueFromEditor = (editedValue, fieldType, originalValue) => {
  try {
    if (fieldType === 'array') {
      const parsed = editedValue.split(',').map(item => item.trim()).filter(item => item);
      // Limit array size
      if (parsed.length > 10000) {
        throw new Error('Array contains too many items (maximum 10,000)');
      }
      return parsed;
    }
    if (fieldType === 'object-with-name' && originalValue) {
      if (typeof originalValue !== 'object' || originalValue === null) {
        throw new Error('Original value must be an object');
      }
      return { ...originalValue, name: editedValue };
    }
    if (fieldType === 'object-with-display' && originalValue) {
      if (typeof originalValue !== 'object' || originalValue === null) {
        throw new Error('Original value must be an object');
      }
      return { ...originalValue, displayName: editedValue };
    }
    
    if (typeof editedValue === 'string' && editedValue.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(editedValue);
        return parsed;
      } catch {
      }
    }
    
    return editedValue;
  } catch (err) {
    throw new Error(`Failed to parse field value: ${err.message}`);
  }
};

