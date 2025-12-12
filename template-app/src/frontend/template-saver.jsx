import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Strong, Stack, Button, Textfield, Form, FormHeader, FormSection, FormFooter, SectionMessage } from '@forge/react';
import { view, invoke, requestJira } from '@forge/bridge';
import { validateTemplateName, validateTemplateData, validateFieldValue, CORE_FIELDS, isFieldEmpty } from './utils.js';

const App = () => {
  const [issueKey, setIssueKey] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    view.getContext()
      .then((context) => {
        const key = 
          context?.extension?.issue?.key ||
          context?.platformContext?.issueKey ||
          context?.issueKey;
        
        if (key) {
          setIssueKey(key);
        } else {
          setIssueKey('Unknown');
        }
      })
      .catch((err) => {
        setMessage({ type: 'error', text: `Failed to load context: ${err.message}` });
      });
  }, []);

  const handleSaveTemplate = async () => {
    const nameValidation = validateTemplateName(templateName);
    if (!nameValidation.valid) {
      setMessage({ type: 'error', text: nameValidation.error });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (!issueKey || issueKey === 'Unknown') {
        throw new Error('No valid issue key found. Please open this from a Jira issue.');
      }
      
      const response = await requestJira(`/rest/api/3/issue/${issueKey}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch issue: ${response.status} ${response.statusText}`);
      }

      const issueData = await response.json();
      
      if (!issueData || !issueData.fields) {
        throw new Error('Invalid issue data received from Jira');
      }

      const excludedFields = [
        'created', 'updated', 'creator', 'reporter', 
        'statuscategorychangedate', 'watches', 'votes',
        'worklog', 'comment', 'issuelinks', 'subtasks',
        'attachment', 'project', 'status', 'resolution',
        'resolutiondate', 'lastViewed', 'aggregatetimeoriginalestimate',
        'aggregatetimeestimate', 'aggregatetimespent', 'workratio',
        'progress', 'aggregateprogress', 'thumbnail'
      ];
      
      const allFields = {};
      const fieldErrors = [];
      
      for (const [fieldKey, fieldValue] of Object.entries(issueData.fields)) {
        if (excludedFields.includes(fieldKey)) {
          continue;
        }
        
        const fieldValidation = validateFieldValue(fieldValue);
        if (!fieldValidation.valid) {
          fieldErrors.push(`${fieldKey}: ${fieldValidation.error}`);
          continue;
        }
        
        const sanitizedValue = fieldValidation.sanitized;
        const isCoreField = CORE_FIELDS.includes(fieldKey);
        
        // Two-tier approach: Always save core fields, only save non-empty other fields
        if (isCoreField || !isFieldEmpty(sanitizedValue)) {
          allFields[fieldKey] = sanitizedValue;
        }
      }
      
      if (fieldErrors.length > 0) {
        console.warn('Some fields were skipped due to validation errors:', fieldErrors);
      }
      
      const templateData = {
        name: nameValidation.sanitized,
        createdAt: new Date().toISOString(),
        sourceIssueKey: issueKey,
        fields: allFields,
        metadata: {
          summary: issueData.fields.summary || '',
          issueType: issueData.fields.issuetype?.name || 'Unknown',
          priority: issueData.fields.priority?.name || 'None',
          customFieldCount: Object.keys(allFields).filter(key => key.startsWith('customfield_')).length
        }
      };

      const dataValidation = validateTemplateData(templateData);
      if (!dataValidation.valid) {
        throw new Error(dataValidation.error);
      }

      const result = await invoke('saveTemplate', { templateData });
      
      if (fieldErrors.length > 0) {
        setMessage({ 
          type: 'success', 
          text: `${result.message} (Note: ${fieldErrors.length} field(s) were skipped due to size/complexity limits)`
        });
      } else {
        setMessage({ 
          type: 'success', 
          text: result.message
        });
      }
      setTemplateName('');
    } catch (err) {
      if (err.message && (err.message.includes('quota') || err.message.includes('storage') || err.message.includes('limit'))) {
        setMessage({ type: 'error', text: 'Storage limit reached. Please delete some templates or contact your administrator.' });
      } else {
        setMessage({ type: 'error', text: err.message || 'Failed to save template' });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSaveTemplate}>
      <FormHeader title="Save Issue as Template" />
      
      <FormSection>
        <Stack space="space.200">
          <Text>
            Save issue <Strong>{issueKey}</Strong> as a reusable template.
          </Text>
          
          <Textfield
            label="Template Name"
            name="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="e.g., Bug Report Template"
            isRequired
          />

          {message && (
            <SectionMessage 
              appearance={message.type === 'error' ? 'error' : 'success'}
            >
              <Text>{message.text}</Text>
            </SectionMessage>
          )}
        </Stack>
      </FormSection>

      <FormFooter>
        <Button 
          appearance="primary" 
          onClick={handleSaveTemplate}
          isDisabled={saving || !templateName.trim()}
          isLoading={saving}
        >
          Save Template
        </Button>
        {templateName.length > 200 && (
          <Text size="small" color="color.text.warning">
            Template name is too long (max 200 characters)
          </Text>
        )}
      </FormFooter>
    </Form>
  );
};

ForgeReconciler.render(<App />);
