// File path: src/uim/index.js
import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { BUG_TEMPLATE, OTHER_TEMPLATE, BUG_SUMMARY, OTHER_SUMMARY} from './templates';
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

    // Different for Bug and different for other types
    const description= getFieldById('description');
    if (isIssueCreate(extension)){
      description?.setValue(isBugType(extension) ? BUG_TEMPLATE : OTHER_TEMPLATE);
    }

    // const summary = getFieldById('summary');
    // if (isIssueCreate(extension)){
    //   summary?.setValue(isBugType(extension) ? BUG_SUMMARY : OTHER_SUMMARY);
    // }

    // const priority= getFieldById('priority');
    // if (isIssueCreate(extension)){
    //   priority?.setValue(isBugType(extension) ? '1' : '5');
    // }

  },
  () => {
    return ['description'];
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