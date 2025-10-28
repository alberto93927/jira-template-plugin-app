import React, { useState, useEffect } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view, invoke } from '@forge/bridge';

const Edit = () => {
  const [value, setValue] = useState('A');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    invoke('get-templates', {}).then(setOptions);
  }, []);

  const onSubmit = async () => {
    try {
      await view.submit(value);
    } catch (e) {
      console.error(e);
    }
  };

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