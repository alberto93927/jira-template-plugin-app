import api, { route } from '@forge/api';
import { TEMPLATES } from './templates.js';

export const handler = async ({ payload, context }) => {
  const { templateId, issueKey, issueId } = event.payload;

  console.log('applyTemplate called:', { templateId, issueKey, issueId });

  if (!templateId) {
    return { success: false, error: 'No template selected' };
  }

  const template = TEMPLATES[templateId];
  if (!template) {
    return { success: false, error: 'Template not found' };
  }

  // For issue creation (no issueKey yet), return template data
  // The frontend will apply it to the form
  if (!issueKey && !issueId) {
    console.log('Returning template for new issue');
    return { 
      success: true, 
      template,
      message: 'Template ready for application'
    };
  }

  // For existing issues, update via API
  try {
    const updateData = {
      fields: {}
    };

    if (template.summary) {
      updateData.fields.summary = template.summary;
    }
    if (template.description) {
      updateData.fields.description = template.description;
    }
    if (template.priority) {
      updateData.fields.priority = template.priority;
    }

    const response = await api.asApp().requestJira(
      route`/rest/api/3/issue/${issueKey || issueId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      }
    );

    console.log('Issue updated:', response.status);

    return { 
      success: true, 
      message: 'Template applied successfully'
    };
  } catch (error) {
    console.error('Error applying template:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}