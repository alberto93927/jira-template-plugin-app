import React, { useState, useEffect } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view, invoke } from '@forge/bridge';

const Edit = () => {
  const [value, setValue] = useState('A');
  const [context, setContext] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    view.getContext().then((ctx) => {
      setContext(ctx);
      // Set initial value from field if it exists
      if (ctx.extension.fieldValue) {
        setValue(ctx.extension.fieldValue);
      }
    });

    invoke('getTemplates').then((templates) => {
      const templateOptions = Object.keys(templates).map((key) => ({
        label: templates[key].summary,
        value: key,
      }));
      setOptions(templateOptions);
    });
  }, []);

  const onSubmit = async () => {
    try {
      setIsApplying(true);
      
      // Submit the field value first
      await view.submit(value);
      
      // Then apply the template via backend
      if (value && context) {
        const result = await invoke('applyTemplate', { 
          templateId: value,
          issueKey: context.extension?.issue?.key,
          issueId: context.extension?.issue?.id
        });
        
        console.log('Template application result:', result);
        
        if (result.success && result.template) {
          // For new issues during creation, we need a different approach
          // We'll notify the user for now
          console.log('Template ready:', result.template);
        }
      }
      
      setIsApplying(false);
    } catch (e) {
      console.error('Error in onSubmit:', e);
      setIsApplying(false);
    }
  };

  return (
    <CustomFieldEdit onSubmit={onSubmit}>
      <Select
        label="Select Template"
        name="options"
        options={options}
        value={value}
        onChange={(newValue) => setValue(newValue.value)}
        isDisabled={isApplying}
      />
    </CustomFieldEdit>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);