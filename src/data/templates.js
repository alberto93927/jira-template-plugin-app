// Hardcoded template data - simulating a database
// This file will be replaced with calls to Atlassian Storage once storage integration is complete
// Structure: Each template has an id, name, description, and fields to prefill (priority, summary, description)

// ADF (Atlassian Document Format) template for bug reports
const BUG_DESCRIPTION = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Description',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'In the description section, you must briefly explain what you have done before facing the bug.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Steps to reproduce',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'In this section, you should describe how to reproduce the bug in step by step manner. Easy to follow steps give room to the developers to fix the issue without any chaos.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Expected result',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'What is the expected output from the application when you make an action which causes failure.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Actual result',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'What is the actual output from the application when you perform the steps to reproduce.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
  ],
};

// ADF template for tasks/features
const TASK_DESCRIPTION = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Background',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'In the background section, please provide details why this change is needed.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Scope of work',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'In this section, you should describe what is the scope of work, changes that need to be made.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Resources',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Provide any useful resources such as links to get more context for the work.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
  ],
};

// Template collection - simulating database records
export const TEMPLATES = [
  {
    id: 'tmpl-001',
    name: 'Bug Report',
    description: 'Standard bug report template with sections for description, steps to reproduce, and expected vs actual results.',
    fields: {
      priority: '1', // Highest priority
      summary: 'Bug: [SHORT DESCRIPTION HERE]',
      description: BUG_DESCRIPTION,
    },
  },
  {
    id: 'tmpl-002',
    name: 'Feature Request',
    description: 'Template for requesting new features or enhancements.',
    fields: {
      priority: '3', // Medium priority
      summary: 'Feature: [SHORT DESCRIPTION HERE]',
      description: TASK_DESCRIPTION,
    },
  },
  {
    id: 'tmpl-003',
    name: 'Task',
    description: 'General task template for development work.',
    fields: {
      priority: '3', // Medium priority
      summary: 'Task: [SHORT DESCRIPTION HERE]',
      description: TASK_DESCRIPTION,
    },
  },
];

// Helper function to get a template by ID
export const getTemplateById = (templateId) => {
  return TEMPLATES.find((tmpl) => tmpl.id === templateId);
};

// Helper function to get all template names and IDs (for dropdown)
export const getTemplateOptions = () => {
  return TEMPLATES.map((tmpl) => ({
    id: tmpl.id,
    name: tmpl.name,
  }));
};
