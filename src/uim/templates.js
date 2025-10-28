// You can use ADF builder to build your onw template @see https://developer.atlassian.com/cloud/jira/platform/apis/document/playground/
export const JIRA_TICKET_TEMPLATES = [
    {
        name: "Bug Report",
        issueType: "Bug",
        summary: "Bug: [SHORT DESCRIPTION HERE]",
        description: {
            version: 1,
            type: 'doc',
            content: [
                {
                    type: 'heading',
                    attrs: {
                        level: 3,
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'Bug Description',
                            marks: [
                                {
                                    type: 'strong',
                                },
                                {
                                    type: 'textColor',
                                    attrs: {
                                        color: '#FF0000',
                                    },
                                },
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
                                {
                                    type: 'em',
                                },
                                {
                                    type: 'textColor',
                                    attrs: {
                                        color: '#FF0000',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        priority: '1',
    },
    {
        name: "Other Task",
        issueType: "Task",
        summary: "Other: [SHORT DESCRIPTION HERE]",
        description: {
            version: 1,
            type: 'doc',
            content: [
                {
                    type: 'heading',
                    attrs: {
                        level: 3,
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'Other Description',
                            marks: [
                                {
                                    type: 'strong',
                                },
                                {
                                    type: 'textColor',
                                    attrs: {
                                        color: '#00FF00',
                                    },
                                },
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
                                {
                                    type: 'em',
                                },
                                {
                                    type: 'textColor',
                                    attrs: {
                                        color: '#00FF00',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        priority: '5',
    }
];