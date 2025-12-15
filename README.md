# Jira Template Manager

A Jira Forge application that streamlines ticket creation by providing customizable templates with pre-filled fields.

## Overview

The Jira Template Manager allows teams to store and manage ticket templates. Users access the Team Template Library to select a template, which opens the Create Issue modal with automatically pre-filled fields like Issue Type, Priority, Summary, and Description. This reduces manual input and improves consistency across projects.

## Features

- **Template Library**: Browse available templates from a dedicated project tab
- **Automatic Prefilling**: CreateIssueModal opens with pre-filled Issue Type, Priority, Summary, and Description
- **Simple Workflow**: No configuration needed - just select a template and create
- **Dynamic Templates**: Load templates from hardcoded data (ready for Atlassian Storage integration)
- **Customizable**: Easy to add, modify, or remove templates

## Architecture

### Current Implementation

The app uses the **CreateIssueModal** approach from `@forge/jira-bridge`:

1. User navigates to **Team Template Library** project tab
2. User selects a template and clicks "Create Issue"
3. `TemplateCreation` component calls `CreateIssueModal` with pre-filled context
4. Modal opens with fields automatically filled
5. User reviews, modifies if needed, and submits

### Key Components

**Frontend (`src/frontend/index.jsx`)**
- `TemplateCreation` component: Displays templates and handles CreateIssueModal
- `ApplyTemplate` component: Placeholder for future "apply to existing issue" feature
- `App` component: Routes to appropriate view based on module key

**Backend (`src/resolvers/`)**
- `index.js`: Forge resolver handlers for template APIs
- `templateResolver.js`: Template data access layer (ready for storage integration)

**Data (`src/data/`)**
- `templates.js`: Hardcoded template definitions (will be replaced with Atlassian Storage)

### Flow Diagram

```
User navigates to project
    ↓
Clicks "Team Template Library" tab
    ↓
TemplateCreation component loads templates via template.getAll resolver
    ↓
Displays list of templates
    ↓
User clicks "Create Issue" on a template
    ↓
Component fetches template data via template.getById resolver
    ↓
Creates new CreateIssueModal with pre-filled context
    ↓
Modal opens with fields automatically filled
    ↓
User modifies fields if needed
    ↓
User submits to create issue
```

## Getting Started

### Prerequisites

- Forge CLI installed ([Setup Guide](https://developer.atlassian.com/platform/forge/set-up-forge/))
- Jira Cloud site with admin access

### Installation

```bash
# Install dependencies
npm install

# Deploy to Jira
forge deploy

# Install to your Jira site
forge install
```

### Usage

1. Navigate to your Jira project
2. Click on the **Team Template Library** tab
3. Browse available templates
4. Click **Create Issue** on any template
5. Review pre-filled fields in the modal
6. Modify as needed and submit

## Template Data Structure

Templates are defined in `src/data/templates.js`:

```javascript
{
  id: 'tmpl-001',
  name: 'Bug',
  description: 'Bug report template',
  fields: {
    priority: '1',              // Jira priority ID
    summary: 'Bug: [summary]',  // Template text
    description: {...},         // ADF (Atlassian Document Format)
    issuetype: '10037'          // Jira issue type ID
  }
}
```

### Adding a New Template

Edit `src/data/templates.js` and add a new template object to the `TEMPLATES` array. Then redeploy:

```bash
forge deploy
```

## Integration Points for Atlassian Storage

The app is structured for easy integration with Atlassian Storage:

1. **Template Data** (`src/data/templates.js`):
   - Replace hardcoded `TEMPLATES` array with `storage:app` API calls
   - Keep `getTemplateById()` function signature the same

2. **Template Resolver** (`src/resolvers/templateResolver.js`):
   - Update to fetch from Atlassian Storage instead of importing from `data/templates`
   - Keep resolver export signatures unchanged:
     - `getTemplates()` - returns all templates
     - `getTemplate({ templateId })` - returns single template
     - `getTemplateSuggestions({ issueTypeName })` - returns suggestions

3. **Frontend** (`src/frontend/index.jsx`):
   - No changes needed - already uses resolvers for data access

## Development

### Commands

```bash
npm run lint           # Run ESLint
forge deploy           # Deploy to Atlassian
forge tunnel           # Proxy invocations locally
```

### Local Development

```bash
# Start local tunnel
forge tunnel

# Make changes to code
# App automatically picks up changes after forge deploy
```

## Project Structure

```
├── src/
│   ├── data/
│   │   └── templates.js          # Template definitions
│   ├── frontend/
│   │   └── index.jsx              # React components
│   └── resolvers/
│       ├── index.js               # Resolver handlers
│       └── templateResolver.js    # Template data access
├── manifest.yml                    # Forge app configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Important Notes

- **Issue Type IDs**: Template issue type IDs (e.g., "10037") must match your Jira instance. Find these in Jira Settings → Issues → Issue types
- **Priority IDs**: Priority IDs (e.g., "1") must match your Jira instance
- **ADF Format**: Descriptions use Atlassian Document Format. Edit in `src/data/templates.js`

## Future Work

- [ ] Integrate with Atlassian Storage for persistent template management
- [ ] Build Template Library admin UI for creating/editing templates
- [ ] Add template categories/tags for organization
- [ ] Support more field types (assignee, labels, custom fields)
- [ ] Template preview functionality
- [ ] Apply template to existing issues
- [ ] Save existing issue as template

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.

For more information about Forge, see [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge).
