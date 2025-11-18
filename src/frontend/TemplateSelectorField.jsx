// File path: src/frontend/TemplateSelectorField.jsx
// Custom field editor for selecting a template to prefill ticket fields
// Saves immediately on selection change to trigger UIM prefill

import React, { useState } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
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

  const handleChange = async (newValue) => {
    const selectedValue = newValue ? newValue.value : '';
    console.log('[TemplateSelectorField] Selection changed:', selectedValue);
    setValue(selectedValue);

    try {
      // Save to sessionStorage so UIM can detect the change
      console.log('[TemplateSelectorField] Saving to sessionStorage:', selectedValue);
      sessionStorage.setItem('template-selection', JSON.stringify({ templateId: selectedValue, timestamp: Date.now() }));
      console.log('[TemplateSelectorField] Template selection saved to sessionStorage');

      // Submit the value to Jira to save the field
      console.log('[TemplateSelectorField] Submitting value to Jira:', selectedValue);
      await view.submit(selectedValue);
      console.log('[TemplateSelectorField] Value submitted to Jira');

      // Dispatch a custom event so UIM can listen for changes
      window.dispatchEvent(new CustomEvent('template-selection-changed', { detail: { templateId: selectedValue } }));
      console.log('[TemplateSelectorField] Custom event dispatched');

      // Also manually dispatch a storage event since sessionStorage changes don't naturally trigger storage events
      const storageEvent = new Event('storage');
      Object.defineProperty(storageEvent, 'key', { value: 'template-selection' });
      window.dispatchEvent(storageEvent);
      console.log('[TemplateSelectorField] Storage event dispatched manually');
    } catch (e) {
      console.error('[TemplateSelectorField] Error during change:', e);
    }
  };

  return (
    <Select
      label="Template"
      placeholder="Choose a template to prefill fields"
      options={options}
      value={value ? { label: options.find((opt) => opt.value === value)?.label || '', value } : null}
      onChange={handleChange}
      isSearchable
      isClearable
    />
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);
