// You can use ADF builder to build your onw template @see https://developer.atlassian.com/cloud/jira/platform/apis/document/playground/
export const BUG_TEMPLATE = {
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
};


export const OTHER_TEMPLATE = {
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
};

export const BUG_SUMMARY = "Bug: [SHORT DESCRIPTION HERE]";
export const OTHER_SUMMARY = "Other: [SHORT DESCRIPTION HERE]";