import { JIRA_TICKET_TEMPLATES } from './src/uim/templates';

export const getTemplates = async () => {
    return JIRA_TICKET_TEMPLATES.map(template => ({
        label: template.name,
        value: template.name,
    }));
};