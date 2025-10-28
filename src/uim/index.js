import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { JIRA_TICKET_TEMPLATES } from './templates';
import { consoleLogDataSnapshots, consoleLogLastUserChange } from './getSnapshots';

const log = console.log;
console.log = (...args) => {
  log('UI modifications app,', ...args);
};

const isIssueCreate = (extension) => extension.viewType === 'GIC';

view.getContext().then((context) => {
  const extension = context.extension;
  console.log('Context:');
  console.table(extension);
});

const { onInit, onChange, onError } = uiModificationsApi;

onInit(
  async ({ api, uiModifications }) => {
    consoleLogDataSnapshots(api);
    const { getFieldById } = api;

    const extension = (await view.getContext()).extension;

    const templateField = getFieldById('customfield_10225');

    templateField.onValueChange((value) => {
      const template = JIRA_TICKET_TEMPLATES.find(t => t.name === value);

      if (template) {
        const description = getFieldById('description');
        if (isIssueCreate(extension)) {
          description?.setValue(template.description);
        }

        const summary = getFieldById('summary');
        if (isIssueCreate(extension)) {
          summary?.setValue(template.summary);
        }

        const priority = getFieldById('priority');
        if (isIssueCreate(extension)) {
          priority?.setValue(template.priority);
        }
      }
    });
  },
  () => {
    return ['description', 'summary', 'priority', 'customfield_10225'];
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