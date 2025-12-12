// File path: src/uim/index.js
// UI Modifications for Create Issue Context (GIC)
// Note: Template pre-filling is now handled by CreateIssueModal in the TemplateCreation component.
// This UIM is kept minimal for potential future enhancements.

import { view } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
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
 * onInit: Currently minimal since template pre-filling is now handled by CreateIssueModal
 *
 * Flow (New Architecture):
 * 1. User navigates to project → clicks "Team Template Library" tab
 * 2. User selects a template and clicks "Create Issue"
 * 3. Our TemplateCreation component calls CreateIssueModal with pre-filled context
 * 4. CreateIssueModal opens with fields pre-filled (no UIM needed)
 * 5. User completes form and submits
 * 6. Issue is created with template values
 *
 * This UIM can be kept minimal or removed entirely in the future.
 */
onInit(
  async ({ api }) => {
    consoleLogDataSnapshots(api);

    const context = await view.getContext();
    const extension = context.extension;

    if (!isIssueCreate(extension)) {
      console.log('Not a Create Issue view, skipping');
      return;
    }

    console.log('Create Issue form initialized. Templates are pre-filled via CreateIssueModal.');
  },
  () => {
    return ['issuetype', 'description', 'summary', 'priority'];
  },
);

/**
 * onChange: Placeholder for future features that may need to react to field changes
 */
onChange(
  async ({ change }) => {
    const { current: currentChange } = change;

    if (!currentChange) {
      return;
    }

    consoleLogLastUserChange(currentChange);
  },
  () => {
    return ['issuetype', 'summary', 'description', 'priority'];
  },
);

onError(({ errors }) => {
  console.error('Errors:', errors);
});