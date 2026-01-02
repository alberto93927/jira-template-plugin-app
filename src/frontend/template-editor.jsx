import React, { useState } from 'react';
import ForgeReconciler, {
  Text,
  Stack,
  Button,
  Textfield,
  SectionMessage,
  Inline
} from '@forge/react';
import { invoke } from '@forge/bridge';
import {
  getFieldDisplayName,
  getFieldType,
  formatFieldValueForEditor,
  parseFieldValueFromEditor,
  validateTemplateName,
  validateFieldValue
} from './utils.js';

const TemplateEditor = ({ template, onBack, onSave }) => {
  const [templateName, setTemplateName] = useState(template?.name || '');
  const [selectedFieldKey, setSelectedFieldKey] = useState('');
  const [selectedFieldValue, setSelectedFieldValue] = useState('');
  const [fieldEditorType, setFieldEditorType] = useState('text');
  const [savingName, setSavingName] = useState(false);
  const [savingField, setSavingField] = useState(false);
  const [message, setMessage] = useState(null);
  const [showFieldList, setShowFieldList] = useState(false);

  if (!template || !template.fields || typeof template.fields !== 'object') {
    return (
      <Stack space="space.300">
        <Button appearance="subtle" onClick={onBack}>← Back to Templates</Button>
        <SectionMessage appearance="error">
          <Text>Invalid template data. This template may be corrupted.</Text>
        </SectionMessage>
      </Stack>
    );
  }

  const handleFieldSelect = (fieldKey) => {
    if (!template.fields || !fieldKey) return;
    
    const fieldValue = template.fields[fieldKey];
    const fieldType = getFieldType(fieldKey, fieldValue);
    
    setSelectedFieldKey(fieldKey);
    setFieldEditorType(fieldType);
    setSelectedFieldValue(formatFieldValueForEditor(fieldValue, fieldType));
  };

  const handleSaveName = async () => {
    const nameValidation = validateTemplateName(templateName);
    if (!nameValidation.valid) {
      setMessage({ type: 'error', text: nameValidation.error });
      return;
    }

    setSavingName(true);
    setMessage(null);
    try {
      const updatedTemplate = {
        ...template,
        name: nameValidation.sanitized,
        sourceIssueKey: template.sourceIssueKey, 
        createdAt: template.createdAt 
      };

      const result = await invoke('updateTemplate', {
        templateId: template.id,
        templateData: updatedTemplate
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Template name updated successfully!' });
        if (onSave) {
          onSave();
        }
      }
    } catch (err) {
      if (err.message && (err.message.includes('quota') || err.message.includes('storage') || err.message.includes('limit'))) {
        setMessage({ type: 'error', text: 'Storage limit reached. Please delete some templates or contact your administrator.' });
      } else {
        setMessage({ type: 'error', text: err.message || 'Failed to update template name' });
      }
    } finally {
      setSavingName(false);
    }
  };

  const handleSaveField = async () => {
    if (!selectedFieldKey) {
      setMessage({ type: 'error', text: 'Please select a field to edit' });
      return;
    }

    setSavingField(true);
    setMessage(null);
    try {
      const originalValue = template.fields[selectedFieldKey];
      let parsedValue;
      
      try {
        parsedValue = parseFieldValueFromEditor(selectedFieldValue, fieldEditorType, originalValue);
      } catch (parseErr) {
        setMessage({ type: 'error', text: parseErr.message || 'Failed to parse field value' });
        setSavingField(false);
        return;
      }
      
      const fieldValidation = validateFieldValue(parsedValue, fieldEditorType);
      if (!fieldValidation.valid) {
        setMessage({ type: 'error', text: fieldValidation.error });
        setSavingField(false);
        return;
      }
      
      const updatedFields = {
        ...template.fields,
        [selectedFieldKey]: fieldValidation.sanitized
      };

      const updatedMetadata = { ...template.metadata };
      if (selectedFieldKey === 'summary') {
        updatedMetadata.summary = typeof parsedValue === 'string' ? parsedValue : '';
      } else if (selectedFieldKey === 'priority') {
        updatedMetadata.priority = typeof parsedValue === 'object' && parsedValue?.name 
          ? parsedValue.name 
          : (typeof parsedValue === 'string' ? parsedValue : 'None');
      } else if (selectedFieldKey === 'issuetype') {
        updatedMetadata.issueType = typeof parsedValue === 'object' && parsedValue?.name 
          ? parsedValue.name 
          : (typeof parsedValue === 'string' ? parsedValue : 'Unknown');
      }

      const updatedTemplate = {
        ...template,
        fields: updatedFields,
        metadata: updatedMetadata
      };

      const result = await invoke('updateTemplate', {
        templateId: template.id,
        templateData: updatedTemplate
      });

      if (result.success) {
        setMessage({ type: 'success', text: `Field "${getFieldDisplayName(selectedFieldKey)}" updated successfully!` });
        setSelectedFieldKey('');
        setSelectedFieldValue('');
        if (onSave) {
          onSave();
        }
      }
    } catch (err) {
      if (err.message && (err.message.includes('quota') || err.message.includes('storage') || err.message.includes('limit'))) {
        setMessage({ type: 'error', text: 'Storage limit reached. Please delete some templates or contact your administrator.' });
      } else {
        setMessage({ type: 'error', text: err.message || 'Failed to update field' });
      }
    } finally {
      setSavingField(false);
    }
  };

  const availableFields = template.fields ? Object.keys(template.fields) : [];

  return (
    <Stack space="space.300">
      <Button 
        appearance="subtle"
        onClick={onBack}
      >
        ← Back to Templates
      </Button>

      {message && (
        <SectionMessage 
          appearance={message.type === 'error' ? 'error' : 'success'}
        >
          <Text>{message.text}</Text>
        </SectionMessage>
      )}

      {/* Template Name Section */}
      <Stack space="space.200">
        <Text>Template Name:</Text>
        <Inline space="space.100">
          <Textfield
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name"
            maxLength={200}
          />
          {templateName.length > 200 && (
            <Text size="small" color="color.text.warning">
              Template name is too long (max 200 characters)
            </Text>
          )}
          <Button 
            appearance="primary"
            onClick={handleSaveName}
            isDisabled={savingName || !templateName.trim()}
            isLoading={savingName}
          >
            Save Name
          </Button>
        </Inline>
      </Stack>

      {/* Field Editing Section */}
      <Stack space="space.200">
        {availableFields.length > 0 ? (
          <>
            <Stack space="space.050">
              <Inline space="space.050">
                <Textfield
                  value={selectedFieldKey ? getFieldDisplayName(selectedFieldKey) : '-- Select a field --'}
                  isReadOnly
                  label="Field to Edit"
                />
                <Button
                  appearance="subtle"
                  onClick={() => setShowFieldList(!showFieldList)}
                >
                  {showFieldList ? '▲' : '▼'}
                </Button>
              </Inline>
              
              {showFieldList && (
                <Stack space="space.025">
                  {availableFields.map((fieldKey) => (
                    <Button
                      key={fieldKey}
                      appearance={selectedFieldKey === fieldKey ? 'primary' : 'subtle'}
                      onClick={() => {
                        handleFieldSelect(fieldKey);
                        setShowFieldList(false);
                      }}
                      style={{ padding: '4px 8px', fontSize: '12px', minHeight: '28px' }}
                    >
                      {getFieldDisplayName(fieldKey)}
                    </Button>
                  ))}
                </Stack>
              )}
            </Stack>

            {selectedFieldKey && template.fields && template.fields[selectedFieldKey] !== undefined && (
              <Stack space="space.200">
                <Text>Current Value:</Text>
                <Textfield
                  value={formatFieldValueForEditor(
                    template.fields[selectedFieldKey],
                    getFieldType(selectedFieldKey, template.fields[selectedFieldKey])
                  )}
                  isReadOnly
                  label="Current Value"
                />

                <Text>New Value:</Text>
                {fieldEditorType === 'textarea' ? (
                  <Stack space="space.100">
                    <Text>New Value</Text>
                    <textarea
                      value={selectedFieldValue}
                      onChange={(e) => setSelectedFieldValue(e.target.value)}
                      rows={6}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '3px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        marginTop: '8px'
                      }}
                      placeholder={`Enter new value for ${getFieldDisplayName(selectedFieldKey)}`}
                    />
                  </Stack>
                ) : (
                  <Textfield
                    value={selectedFieldValue}
                    onChange={(e) => setSelectedFieldValue(e.target.value)}
                    label="New Value"
                    placeholder={`Enter new value for ${getFieldDisplayName(selectedFieldKey)}`}
                  />
                )}

                <Text>Field Type: {fieldEditorType}</Text>

                <Button 
                  appearance="primary" 
                  onClick={handleSaveField}
                  isDisabled={!selectedFieldKey || savingField}
                  isLoading={savingField}
                >
                  Save Field Changes
                </Button>
              </Stack>
            )}
          </>
        ) : (
          <Text>No fields available in this template.</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default TemplateEditor;

