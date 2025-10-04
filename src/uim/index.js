// File path: src/uim/index.js
import { uiModificationsApi } from '@forge/jira-bridge';

uiModificationsApi.onInit(async ({ api, context }) => {
  console.log('[UIM] init', context);
  const summary = api.getFieldById('summary');
  if (summary) {
    const cur = summary.getValue?.() || '';
    summary.setValue(`[Template] ${cur}`);
    console.log('[UIM] summary set');
  } else {
    console.warn('[UIM] summary field not found');
  }
}, () => ['summary']);
