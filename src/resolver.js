import Resolver from '@forge/resolver';
import { JIRA_TICKET_TEMPLATES } from './uim/templates';

const resolver = new Resolver();

resolver.define('get-templates', async () => {
    return JIRA_TICKET_TEMPLATES.map(template => ({
        label: template.name,
        value: template.name,
    }));
});

export const handler = resolver.getDefinitions();