import Resolver from '@forge/resolver';
import { JIRA_TICKET_TEMPLATES } from './src/uim/templates';

const resolver = new Resolver();

// Define the invokable function. The key ('get-templates') must match the invocation key in your frontend.
resolver.define('get-templates', async () => {
    return JIRA_TICKET_TEMPLATES.map(template => ({
        label: template.name,
        value: template.name,
    }));
});

// Export the definitions as 'handler', which is the standard entry point.
export const handler = resolver.getDefinitions();