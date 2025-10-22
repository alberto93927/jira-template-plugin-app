// File path: src/uim/index.js
import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { BUG_TICKET_TEMPLATE, OTHER_TICKET_TEMPLATE } from './templates';
import { consoleLogDataSnapshots, consoleLogLastUserChange } from './getSnapshots';

const log = console.log;
console.log = (...args) => {
  log('UI modifications app,', ...args);
};

// const isIssueTranstion = (extension: UiModificationExtension) => extension.viewType === 'IssueTransition';
// const isIssueView = (extension: UiModificationExtension) => extension.viewType === 'IssueView';
const isIssueCreate = (extension) => extension.viewType === 'GIC';
const isBugType = (extension) => extension.issueType.name === 'Bug';

// Context usage
view.getContext().then((context) => {
  const extension = context.extension;
  console.log('Context:');
  console.table(extension);
});

const { onInit, onChange, onError } = uiModificationsApi;

onInit(
  async ({ api, uiModifications }) => {
    consoleLogDataSnapshots(api);
    const { getFieldById, getScreenTabById } = api;

    const extension = (await view.getContext()).extension;

    const template = isBugType(extension) ? BUG_TICKET_TEMPLATE : OTHER_TICKET_TEMPLATE;

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
  },
  () => {
    return ['description', 'summary', 'priority'];
  },
);

onChange(
  ({ api, change }) => {
    const { getFieldById } = api;
    // The `change.current` property provides access to the field which triggered the change
    const { current: currentChange } = change;
    if (!currentChange) {
      return;
    }
    consoleLogLastUserChange(currentChange);

  },
  () => [],
);

onError(({ errors }) => {
  console.log('Errors', errors)
})