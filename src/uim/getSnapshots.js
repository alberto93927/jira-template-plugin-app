import { HookApi, Field } from '@forge/jira-bridge';

function getFieldData(field) {
  return {
    type: field.getType(),
    name: field.getName(),
    value: field.getValue(),
    optionsVisibility: field.getOptionsVisibility?.(),
    description: field.getDescription(),
    isVisible: field.isVisible(),
    isReadOnly: field.isReadOnly(),
    isRequired: field.isRequired?.(),
  };
}

export function getFieldsSnapshot({ getFields }) {
  return getFields().reduce((acc, field) => {
    acc[field.getId()] = getFieldData(field);

    return acc;
  }, {});
}

export function getScreenTabsSnapshot({ getScreenTabs }) {
  return getScreenTabs?.().reduce((acc, tab) => {
    acc[tab.getId()] = {
      id: tab.getId(),
      isVisible: tab.isVisible(),
    };

    return acc;
  }, {});
}

export const consoleLogDataSnapshots = (api) => {
  console.log('Fields snapshot:');
  console.table(getFieldsSnapshot(api));

  console.log('Screen tabs snapshot:');
  console.table(getScreenTabsSnapshot(api));
};

export const consoleLogLastUserChange = (field) => {
  console.log('Last change snapshot:');
  console.table({ [field.getId()]: getFieldData(field) });
};
