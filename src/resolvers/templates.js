export const TEMPLATES = {
  BUG: {
    summary: "Bug: [SHORT DESCRIPTION HERE]",
    description: {
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
              marks: [
                { type: 'strong' },
                { type: 'textColor', attrs: { color: '#FF0000' } },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This description section is unique to Bug work type. Take a look at the features that can be prefilled, such as font, styling, and color. Priority is also changed.',
              marks: [
                { type: 'em' },
                { type: 'textColor', attrs: { color: '#FF0000' } },
              ],
            },
          ],
        },
      ],
    },
    priority: { id: '1' },
  },
  OTHER: {
    summary: "Other: [SHORT DESCRIPTION HERE]",
    description: {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [
            {
              type: 'text',
              text: 'Other Description',
              marks: [
                { type: 'strong' },
                { type: 'textColor', attrs: { color: '#00FF00' } },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This description section is unique to Other work types. Take a look at the features that can be prefilled, such as font, styling, and color. Priority is also changed.',
              marks: [
                { type: 'em' },
                { type: 'textColor', attrs: { color: '#00FF00' } },
              ],
            },
          ],
        },
      ],
    },
    priority: { id: '5' },
  },
  A: {
    summary: "Option A: [SHORT DESCRIPTION HERE]",
    description: {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is the template for Option A.',
            },
          ],
        },
      ],
    },
    priority: { id: '2' },
  },
  B: {
    summary: "Option B: [SHORT DESCRIPTION HERE]",
    description: {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is the template for Option B.',
            },
          ],
        },
      ],
    },
    priority: { id: '3' },
  },
  C: {
    summary: "Option C: [SHORT DESCRIPTION HERE]",
    description: {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is the template for Option C.',
            },
          ],
        },
      ],
    },
    priority: { id: '4' },
  },
};