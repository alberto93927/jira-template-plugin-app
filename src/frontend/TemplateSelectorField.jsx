// File path: src/frontend/TemplateSelectorField.jsx
// Custom field editor for selecting a template to prefill ticket fields
// Uses the proven pattern from commit 5290412 with dynamic template options

import React, { useState, useEffect } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view } from '@forge/bridge';
import { getTemplateOptions } from '../data/templates';

const Edit = ({ value: initialValue }) => {
  const [value, setValue] = useState(initialValue || '');
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);

  // Load template options on mount
  useEffect(() => {
    try {
      console.log('[TemplateSelectorField] Loading template options...');
      const templateOptions = getTemplateOptions();
      const selectOptions = templateOptions.map((tmpl) => ({
        label: tmpl.name,
        value: tmpl.id,
      }));
      setOptions(selectOptions);
      setLoading(false);
      console.log('[TemplateSelectorField] Loaded options:', selectOptions);
    } catch (e) {
      console.error('[TemplateSelectorField] Failed to load templates:', e);
      setLoading(false);
    }
  }, []);

  const onSubmit = async () => {
    try {
      console.log('[TemplateSelectorField] Submitting value:', value);
      await view.submit(value);
      console.log('[TemplateSelectorField] Value submitted successfully');
    } catch (e) {
      console.error('[TemplateSelectorField] Error submitting:', e);
    }
  };

  if (loading) {
    return <div>Loading templates…</div>;
  }

  return (
    <CustomFieldEdit onSubmit={onSubmit}>
      <Select
        label="Template"
        placeholder="Choose a template to prefill fields"
        options={options}
        value={value ? { label: options.find((opt) => opt.value === value)?.label || '', value } : null}
        onChange={(newValue) => {
          const selectedValue = newValue ? newValue.value : '';
          console.log('[TemplateSelectorField] Selection changed:', selectedValue);
          setValue(selectedValue);
        }}
        isSearchable
        isClearable
      />
    </CustomFieldEdit>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);
