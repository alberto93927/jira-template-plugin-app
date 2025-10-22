// File path: src/uim/index.js
import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { BUG_TEMPLATE, OTHER_TEMPLATE, BUG_SUMMARY, OTHER_SUMMARY} from './templates';
import { consoleLogDataSnapshots, consoleLogLastUserChange } from './getSnapshots';

// uiModificationsApi.onInit(async ({ api, context }) => {
//   console.log('[UIM] init', context);
//   const summary = api.getFieldById('summary');
//   if (summary) {
//     const cur = summary.getValue?.() || '';
//     summary.setValue(`[Template] ${cur}`);
//     console.log('[UIM] summary set');
//   } else {
//     console.warn('[UIM] summary field not found');
//   }
// }, () => ['summary']);

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

    // ##################
    // TODO 1: Set template for description but only on Issue create
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

    // ##################
    // TODO 2: Make the Quality Assurance tab visibile only when user tries to transtion into "Done" status.
    // Require "change impact" and "quality review" fields to be fulfilled by the user.

    // ##################
    // TODO 3: Limit the amount
    // Limit list of priorities if labels contains "RTB"
    // We want to avoid situation when RTB work is always at the bottom of the backlog
    // Hence, this can help us enforcing the priority for RTB work.
  },
  () => {
    // return ['description', 'customfield_10070', 'customfield_10069', 'priority'];
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

    // ##################
    // TODO 4: Limit list of priorites just after user adds the "RTB" label.
    // Similar logic like in onInit
    // const id = currentChange.getId();
  },
  // () => ['priority'],
  () => [],
);

onError(({ errors }) => {
  console.log('Errors', errors)
})