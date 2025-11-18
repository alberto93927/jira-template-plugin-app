// File path: src/uim/index.js
// UI Modifications for Create Issue Context (GIC) - prefills fields based on selected template

import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { getTemplateById } from '../data/templates';
import { consoleLogDataSnapshots, consoleLogLastUserChange } from './getSnapshots';

const log = console.log;
console.log = (...args) => {
  log('[UIM]', ...args);
};

const isIssueCreate = (extension) => extension.viewType === 'GIC';

// Context usage
view.getContext().then((context) => {
  const extension = context.extension;
  console.log('Extension context:', extension);
});

const { onInit, onChange, onError } = uiModificationsApi;

/**
 * onInit: Prefill fields based on selected template
 * If a template is selected (via backend resolver), use its values.
 * Otherwise, apply a default template based on issue type.
 *
 * Note: Custom fields rendered with customRenderer are not accessible via UIM API,
 * so we use a backend resolver to communicate the selected template ID from the custom field.
 */
onInit(
  async ({ api }) => {
    consoleLogDataSnapshots(api);
    const { getFieldById } = api;

    const context = await view.getContext();
    const extension = context.extension;

    if (!isIssueCreate(extension)) {
      console.log('Not a Create Issue view, skipping prefill');
      return;
    }

    try {
      let selectedTemplateId = null;

      // Try to get template selection from sessionStorage
      // The custom field saves to sessionStorage on submit
      try {
        console.log('Attempting to get template selection from sessionStorage...');
        const stored = sessionStorage.getItem('template-selection');
        if (stored) {
          const data = JSON.parse(stored);
          selectedTemplateId = data.templateId;
          console.log('Found template selection in sessionStorage:', selectedTemplateId);
        } else {
          console.log('No template selection found in sessionStorage');
        }
      } catch (storageError) {
        console.warn('Error reading sessionStorage:', storageError);
      }

      let template = null;

      if (selectedTemplateId) {
        // User selected a template - use it
        console.log('Using selected template ID:', selectedTemplateId);
        template = getTemplateById(selectedTemplateId);
        if (!template) {
          console.warn('Template not found for ID:', selectedTemplateId);
          // Fall through to use default
        }
      }

      if (!template) {
        // No template selected - apply default based on issue type
        console.log('No template selected, using issue type default');
        const issueTypeName = extension?.issueType?.name;

        if (issueTypeName === 'Bug') {
          template = getTemplateById('tmpl-001'); // Bug Report template
        } else {
          template = getTemplateById('tmpl-002'); // Feature Request template (default)
        }
      }

      if (!template) {
        console.warn('No template could be determined');
        return;
      }

      // Prefill fields from template
      console.log('Applying template:', template.name);

      const description = getFieldById('description');
      if (description && template.fields.description) {
        description.setValue(template.fields.description);
      }

      const summary = getFieldById('summary');
      if (summary && template.fields.summary) {
        summary.setValue(template.fields.summary);
      }

      const priority = getFieldById('priority');
      if (priority && template.fields.priority) {
        priority.setValue(template.fields.priority);
      }

      const issuetype = getFieldById('issuetype');
      if (issuetype && template.fields.issuetype) {
        console.log('Setting issue type to:', template.fields.issuetype);
        issuetype.setValue(template.fields.issuetype);
      }

    } catch (e) {
      console.error('Error during prefill initialization:', e);
    }
  },
  () => {
    // Watch these fields for changes
    return ['issuetype', 'description', 'summary', 'priority', 'customfield_10058'];
  },
);

/**
 * onChange: Track field changes and potentially re-prefill based on template selection
 */
onChange(
  async ({ api, change }) => {
    const { getFieldById } = api;
    const { current: currentChange } = change;

    if (!currentChange) {
      return;
    }

    consoleLogLastUserChange(currentChange);

    // If the template field was changed, re-apply prefill
    if (currentChange.fieldId === 'customfield_10058') {
      console.log('Template field changed, re-applying prefill');
      const templateId = currentChange.value;

      if (!templateId) {
        console.log('Template cleared');
        return;
      }

      const template = getTemplateById(templateId);
      if (!template) {
        console.warn('Template not found:', templateId);
        return;
      }

      // Apply template values to other fields
      const description = getFieldById('description');
      if (description && template.fields.description) {
        description.setValue(template.fields.description);
      }

      const summary = getFieldById('summary');
      if (summary && template.fields.summary) {
        summary.setValue(template.fields.summary);
      }

      const priority = getFieldById('priority');
      if (priority && template.fields.priority) {
        priority.setValue(template.fields.priority);
      }

      const issuetype = getFieldById('issuetype');
      if (issuetype && template.fields.issuetype) {
        issuetype.setValue(template.fields.issuetype);
      }

      console.log('Template applied:', template.name);
    }
  },
  () => {
    // Watch all relevant fields
    return ['issuetype', 'description', 'summary', 'priority', 'customfield_10058'];
  },
);

onError(({ errors }) => {
  console.error('Errors:', errors);
});