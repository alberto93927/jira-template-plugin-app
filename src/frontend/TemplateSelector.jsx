import React, { useState } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view } from '@forge/bridge';

const Edit = () => {
  const [value, setValue] = useState('A');

  const onSubmit = async () => {
    try {
      await view.submit(value);
    } catch (e) {
      console.error(e);
    }
  };

  const options = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' },
  ];

  return (
    <CustomFieldEdit onSubmit={onSubmit}>
      <Select
        label="Options"
        name="options"
        options={options}
        onChange={(newValue) => setValue(newValue.value)}
      />
    </CustomFieldEdit>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);
