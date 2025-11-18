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
    // Store API reference globally so custom event handler can use it
    window.__uimApi = api;

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

    let templateId = null;

    // Check if the template field itself was changed
    if (currentChange.fieldId === 'customfield_10058') {
      console.log('Template field changed via Jira API');
      templateId = currentChange.value;
    } else {
      // Template field might not trigger through Jira API, so also check sessionStorage
      // This handles the case where view.submit() is used without triggering onChange
      try {
        const stored = sessionStorage.getItem('template-selection');
        if (stored) {
          const data = JSON.parse(stored);
          const storedTemplateId = data.templateId;
          console.log('Checking sessionStorage for template selection:', storedTemplateId);

          // Only re-apply if this is a different template than what's in the field
          const fieldValue = getFieldById('customfield_10058')?.getValue();
          if (storedTemplateId && storedTemplateId !== fieldValue) {
            console.log('Template selection changed in sessionStorage:', storedTemplateId);
            templateId = storedTemplateId;
          }
        }
      } catch (e) {
        console.warn('Error reading sessionStorage:', e);
      }
    }

    if (templateId) {
      const template = getTemplateById(templateId);
      if (!template) {
        console.warn('Template not found:', templateId);
        return;
      }

      console.log('Applying template:', template.name);

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

// Helper function to apply template from sessionStorage
const applyTemplateFromSessionStorage = async (api) => {
  const { getFieldById } = api;

  try {
    const stored = sessionStorage.getItem('template-selection');
    if (!stored) {
      console.log('No template selection in sessionStorage');
      return;
    }

    const data = JSON.parse(stored);
    const templateId = data.templateId;
    console.log('Applying template from sessionStorage:', templateId);

    const template = getTemplateById(templateId);
    if (!template) {
      console.warn('Template not found:', templateId);
      return;
    }

    console.log('Re-applying template:', template.name);

    const description = getFieldById('description');
    if (description && template.fields.description) {
      console.log('Setting description:', template.fields.description);
      description.setValue(template.fields.description);
      console.log('Description set');
    }

    const summary = getFieldById('summary');
    if (summary && template.fields.summary) {
      console.log('Setting summary:', template.fields.summary);
      summary.setValue(template.fields.summary);
      console.log('Summary set');
    }

    const priority = getFieldById('priority');
    if (priority && template.fields.priority) {
      console.log('Setting priority:', template.fields.priority);
      priority.setValue(template.fields.priority);
      console.log('Priority set');
    }

    const issuetype = getFieldById('issuetype');
    if (issuetype && template.fields.issuetype) {
      console.log('Setting issuetype:', template.fields.issuetype);
      issuetype.setValue(template.fields.issuetype);
      console.log('Issuetype set');
    }

    console.log('Template re-applied:', template.name);
  } catch (e) {
    console.error('Error applying template from sessionStorage:', e);
  }
};

// Listen for storage changes using the storage event
// This works across different contexts/iframes
if (typeof window !== 'undefined') {
  window.addEventListener('storage', async (event) => {
    if (event.key === 'template-selection' && window.__uimApi) {
      console.log('Storage event: template-selection changed');
      await applyTemplateFromSessionStorage(window.__uimApi);
    }
  });

  // Also try the custom event approach as a fallback
  window.addEventListener('template-selection-changed', async (event) => {
    console.log('Custom event received: template-selection-changed', event.detail);
    if (window.__uimApi) {
      await applyTemplateFromSessionStorage(window.__uimApi);
    } else {
      console.warn('UIM API not available for custom event');
    }
  });

  // Start polling sessionStorage every 100ms as a fallback
  let lastTemplateId = null;
  setInterval(() => {
    try {
      const stored = sessionStorage.getItem('template-selection');
      if (stored && window.__uimApi) {
        const data = JSON.parse(stored);
        const currentTemplateId = data.templateId;
        if (currentTemplateId !== lastTemplateId) {
          console.log('Polling detected template change:', currentTemplateId);
          lastTemplateId = currentTemplateId;
          applyTemplateFromSessionStorage(window.__uimApi);
        }
      }
    } catch (e) {
      // Ignore polling errors
    }
  }, 100);
}

onError(({ errors }) => {
  console.error('Errors:', errors);
});