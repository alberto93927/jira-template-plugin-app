import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { JIRA_TICKET_TEMPLATES } from './templates';
import { consoleLogDataSnapshots } from './getSnapshots';

const log = console.log;
console.log = (...args) => {
  log('UI modifications app,', ...args);
};

const isIssueCreate = (extension) => extension.viewType === 'GIC';

view.getContext().then((context) => {
  const extension = context.extension;
  // Use standard logging
  console.log('UI modifications app, Context:');
  console.table(extension);
});

const { onInit, onChange, onError } = uiModificationsApi;

onInit(
  async ({ api }) => {
    consoleLogDataSnapshots(api); 
    
    const { getFieldById } = api;

    const extension = (await view.getContext()).extension;

    const TEMPLATE_FIELD_ID = 'customfield_10258'; 
    const templateField = getFieldById(TEMPLATE_FIELD_ID);

    if (templateField) {
      console.log(`[SUCCESS] Found template selector field: ${TEMPLATE_FIELD_ID}. Attaching listener.`);
      
      templateField.onValueChange((value) => {
        const template = JIRA_TICKET_TEMPLATES.find(t => t.name === value);

        if (template) {
          const description = getFieldById('description');
          const summary = getFieldById('summary');
          const priority = getFieldById('priority');

          if (isIssueCreate(extension)) {
            // Priority
            priority?.setValue(template.priority);
            
            // Summary
            summary?.setValue(template.summary);
            
            // Description (ADF)
            description?.setValue(template.description);

            console.log(`[PREFILL] Prefilling fields with template: ${value}`);
            console.log(`[PREFILL] Summary set to: ${template.summary}`);
            console.log(`[PREFILL] Priority set to: ${template.priority}`);
            // Note: Description ADF content is too complex to log directly, but if summary/priority work, description will too.
          }
        }
      });
    } else {
        console.warn(`[FAIL] Custom field '${TEMPLATE_FIELD_ID}' not found.`);
    }
  },
  () => {
    return ['description', 'summary', 'priority', 'customfield_10258'];
  },
);

onChange(
  ({ api, change }) => {
    const { getFieldById } = api;
    const { current: currentChange } = change;
    if (!currentChange) {
      return;
    }
    consoleLogLastUserChange(currentChange);

  },
  () => {
    return [];
  },
);

onError(({ errors }) => {
  console.log('Errors', errors)
})