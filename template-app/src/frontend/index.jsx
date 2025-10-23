import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Strong, Stack, Button, Textfield, Form, FormHeader, FormSection, FormFooter, SectionMessage } from '@forge/react';
import { view, invoke, requestJira } from '@forge/bridge';

const App = () => {
  //State variables
  const [issueKey, setIssueKey] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    //Get the issue key from the context
    view.getContext()
      .then((context) => {
        console.log('Full context:', context);
        const key = context?.platformContext?.issueKey;
        console.log('Issue key extracted:', key);
        setIssueKey(key || 'Unknown');
      })
      .catch((err) => {
        console.error('Error loading context:', err);
        setMessage({ type: 'error', text: `Failed to load context: ${err.message}` });
      });
  }, []);

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a template name' });
      return;
    }

    //Set the saving state to true
    setSaving(true);
    setMessage(null);

    try {
      console.log('Attempting to fetch issue with key:', issueKey);
      
      if (!issueKey || issueKey === 'Unknown') {
        throw new Error('No valid issue key found. Please open this from a Jira issue.');
      }
      
      const response = await requestJira(`/rest/api/3/issue/${issueKey}`);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch issue: ${response.status} ${response.statusText}`);
      }

      const issueData = await response.json();
      
      if (!issueData || !issueData.fields) {
        console.error('Invalid issue data:', issueData);
        throw new Error('Invalid issue data received from Jira');
      }
      //fields to exclude from the template
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
      //loop through the fields and add them to the template data
      for (const [fieldKey, fieldValue] of Object.entries(issueData.fields)) {
        if (excludedFields.includes(fieldKey)) {
          continue;
        }
        
        allFields[fieldKey] = fieldValue;
      }

      //template data to save
      const templateData = {
        name: templateName.trim(),
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

      const result = await invoke('saveTemplate', { templateData });
      setMessage({ 
        type: 'success', 
        text: `${result.message}.` 
      });
      setTemplateName('');
    } catch (err) {
      console.error('Error saving template:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to save template' });
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
      </FormFooter>
    </Form>
  );
};

ForgeReconciler.render(<App />);
