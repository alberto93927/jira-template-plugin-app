// File path: src/frontend/TemplateSelectorField.jsx
// Custom field editor for selecting a template to prefill ticket fields
// Follows the proven pattern from commit c98d641

import React, { useState } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view } from '@forge/bridge';
import { getTemplateOptions } from '../data/templates';

const Edit = () => {
  // Get template options as Select options
  const templateOptions = getTemplateOptions();
  const options = templateOptions.map((tmpl) => ({
    label: tmpl.name,
    value: tmpl.id,
  }));

  // Default to first template if available
  const defaultValue = options.length > 0 ? options[0].value : '';
  const [value, setValue] = useState(defaultValue);

  const onSubmit = async () => {
    try {
      console.log('[TemplateSelectorField] Submitting value:', value);

      // Save template selection to sessionStorage so UIM can access it
      // This persists for the duration of the Create Issue flow
      sessionStorage.setItem('template-selection', JSON.stringify({ templateId: value, timestamp: Date.now() }));
      console.log('[TemplateSelectorField] Template selection saved to sessionStorage');

      // Submit the value to Jira to save the field
      await view.submit(value);
      console.log('[TemplateSelectorField] Value submitted to Jira:', value);
    } catch (e) {
      console.error('[TemplateSelectorField] Error during submit:', e);
    }
  };

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
