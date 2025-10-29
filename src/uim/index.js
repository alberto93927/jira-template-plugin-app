console.log('--- UI MODIFICATIONS MODULE STARTING ---');
import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { JIRA_TICKET_TEMPLATES } from './templates';
import { consoleLogDataSnapshots } from './getSnapshots';

// const log = console.log;
// console.log = (...args) => {
//   log('UI modifications app,', ...args);
// };

const isIssueCreate = (extension) => extension.viewType === 'GIC';

view.getContext().then((context) => {
  const extension = context.extension;
  // Use standard logging
  console.log('UI modifications app, Context:');
  // console.table(extension);
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

// onChange(
//   ({ api, change }) => {
//     const { getFieldById } = api;
//     const { current: currentChange } = change;
//     if (!currentChange) {
//       return;
//     }
//     consoleLogLastUserChange(currentChange);

//   },
//   () => {
//     return [];
//   },
// );

onChange(
  ({ api, change }) => {
    const { getFieldById } = api;
    
    // The `change.current` property provides access to the field which triggered the change
    const { current: currentChange } = change;

    // Check that the change is the template field before proceeding
    if (!currentChange || currentChange.getId() !== 'customfield_10258') {
      return;
    }
    
    // Log the change, this should now appear!
    consoleLogLastUserChange(currentChange);

    const templateValue = currentChange.getValue();
    
    // NOTE: You would typically fetch the full template data here, 
    // but for now, you can add logic based on the raw templateValue ('A', 'B', 'C')
    // to set other fields.

    // Example logic based on selected template:
    if (templateValue === 'B') {
        getFieldById('summary')?.setValue('New Summary for Template B');
        // ... set other fields as needed ...
    }
  },
  // CORRECTED: Return the field ID(s) you want to subscribe to
  () => {
    return ['customfield_10258']; // <-- MUST include the custom field ID
  },
);

onError(({ errors }) => {
  console.log('Errors', errors)
})