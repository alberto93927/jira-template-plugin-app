import { uiModificationsApi } from '@forge/jira-bridge';

uiModificationsApi.onInit(async ({ api, context }) => {
  console.log('[UIM] init', context);
  const summary = api.getFieldById('summary');
  if (summary) {
    const current = summary.getValue?.() || '';
    summary.setValue(`[Template] ${current}`);
    console.log('[UIM] summary set');
  } else {
    console.warn('[UIM] summary field not found');
  }
}, () => ['summary']);