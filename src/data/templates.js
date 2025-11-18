// Hardcoded template data - simulating a database
// This file will be replaced with calls to Atlassian Storage once storage integration is complete
// Structure: Each template has an id, name, description, and fields to prefill

// Template collection - simulating database records

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
          text: 'Bug Description',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple and brief bug description.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
  ],
};

const EPIC_DESCRIPTION = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Epic Description',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple and brief epic description.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
  ],
};

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
          text: 'Task Description',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple and brief task description.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
  ],
};

const STORY_DESCRIPTION = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Story Description',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple and brief Story description.',
          marks: [
            { type: 'em' },
            { type: 'textColor', attrs: { color: '#97a0af' } },
          ],
        },
      ],
    },
  ],
};

export const TEMPLATES = [
  {
    id: 'tmpl-001',
    name: 'Bug',
    description: 'Bug report template',
    fields: {
      priority: '1',
      summary: 'Bug: [summary here]',
      description: BUG_DESCRIPTION,
      issuetype: '10037',
    },
  },
  {
    id: 'tmpl-002',
    name: 'Epic',
    description: 'Epic template',
    fields: {
      priority: '2',
      summary: 'Epic: [summary here]',
      description: EPIC_DESCRIPTION,
      issuetype: '10000',
    },
  },
  {
    id: 'tmpl-003',
    name: 'Task',
    description: 'Task template',
    fields: {
      priority: '3',
      summary: 'Task: [summary here]',
      description: TASK_DESCRIPTION,
      issuetype: '10035',
    },
  },
  {
    id: 'tmpl-004',
    name: 'Story',
    description: 'Story template',
    fields: {
      priority: '3',
      summary: 'Story: [summary here]',
      description: STORY_DESCRIPTION,
      issuetype: '10034',
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
