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
 * If a template is selected in the custom field, use its values.
 * Otherwise, apply a default template based on issue type.
 */
onInit(
  async ({ api }) => {
    consoleLogDataSnapshots(api);
    const { getFieldById } = api;

    const extension = (await view.getContext()).extension;

    if (!isIssueCreate(extension)) {
      console.log('Not a Create Issue view, skipping prefill');
      return;
    }

    try {
      // Debug: Check if the custom field exists
      console.log('Attempting to get template field with ID: customfield_10058');
      const templateField = getFieldById('customfield_10058'); // Template custom field key
      console.log('Template field object:', templateField);
      console.log('Template field value:', templateField?.getValue());

      if (!templateField) {
        console.warn('Template field not found! Field may not be added to Create Issue screen.');
      }

      const selectedTemplateId = templateField?.getValue();

      let template = null;

      if (selectedTemplateId) {
        // User selected a template - use it
        console.log('Selected template ID:', selectedTemplateId);
        template = getTemplateById(selectedTemplateId);
        if (!template) {
          console.warn('Template not found:', selectedTemplateId);
          return;
        }
      } else {
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

    } catch (e) {
      console.error('Error during prefill initialization:', e);
    }
  },
  () => {
    // Watch these fields for changes
    return ['description', 'summary', 'priority', 'customfield_10058'];
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

      console.log('Template applied:', template.name);
    }
  },
  () => {
    // Watch all relevant fields
    return ['description', 'summary', 'priority', 'customfield_10058'];
  },
);

onError(({ errors }) => {
  console.error('Errors:', errors);
});