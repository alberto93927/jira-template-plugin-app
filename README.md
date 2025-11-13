# Jira Template Manager

A Jira Forge application that streamlines ticket creation by providing customizable templates to prefill fields.

## Overview

The Jira Template Manager allows teams to store and manage ticket templates. When creating a new issue, users can select a template from a custom dropdown field to automatically prefill fields like Priority, Summary, and Description. This reduces manual input and improves consistency across projects.

## Features

- **Template Selection**: Dropdown custom field for selecting templates
- **Automatic Prefilling**: Automatically populate Priority, Summary, and Description fields based on selected template
- **Project-Level Enablement**: Simple single-click activation per project
- **Dynamic Templates**: Load templates from hardcoded data (easy to integrate with storage later)
- **Default Templates**: Apply issue-type-specific defaults when no template is selected

## Architecture

### Key Components

**Frontend (`src/frontend/`)**
- `index.jsx`: Main React app router - handles Template Settings, Project Library, and Apply Template views
- `TemplateSelector.jsx`: Custom field component for template selection dropdown

**Backend (`src/resolvers/`)**
- `index.js`: Forge resolver handlers for UIM management and template APIs
- `templateResolver.js`: Template data access layer (currently hardcoded, ready for storage integration)

**Data & UI Modifications (`src/uim/` and `src/data/`)**
- `index.js`: UI Modifications handler - prefills fields on Create Issue view
- `templates.js`: Hardcoded template definitions (legacy, being consolidated)
- `src/data/templates.js`: Central template database (simulated with hardcoded data)

### Flow Diagram

```
User opens Create Issue
    ↓
UIM.onInit() runs
    ↓
Check if template selected in custom field?
    ├─ YES: Load template by ID from data/templates.js
    └─ NO: Use default based on issue type
    ↓
Prefill fields: Priority, Summary, Description
    ↓
User can modify or select a template
    ↓
UIM.onChange() detects template field change
    ↓
Re-apply prefill with new template
```

## Enablement Flow

### Prerequisites: Configure Custom Field in Jira

Before enabling the feature, the custom field must be added to the Create Issue screen:

1. Go to **Jira Settings** → **Issues** → **Screens**
2. Find and configure the **Create Issue Screen**
3. Add the **Template** custom field to the screen
4. Save configuration

**See SETUP_INSTRUCTIONS.md for detailed steps.**

### For Jira Admins

1. Go to **Project Settings** → **Template Manager Settings**
2. Click **Enable Template Manager** button
3. Feature is now active for all issue types in the project

**Note**: This is an app-specific enablement gate, separate from Jira's standard field configuration. The Template Settings page is custom-built and not part of standard Jira administration.

### For End Users

1. Open **Create Issue** dialog in a project with Template Manager enabled
2. Look for the **Template** dropdown field
3. Select a template to prefill fields automatically
4. Modify any field as needed
5. Create the issue

## Template Data Structure

Templates are defined in `src/data/templates.js`:

```javascript
{
  id: 'tmpl-001',
  name: 'Bug Report',
  description: 'Standard bug report template...',
  fields: {
    priority: '1',           // Jira priority ID
    summary: 'Bug: [TEXT]',  // Template text
    description: {...}       // ADF (Atlassian Document Format)
  }
}
```

## Integration Points for Storage

The app is structured for easy integration with Atlassian Storage once your teammate's work is complete:

1. **Template Data** (`src/data/templates.js`):
   - Replace hardcoded `TEMPLATES` array with calls to `storage:app` API
   - Keep `getTemplateById()` and `getTemplateOptions()` function signatures the same

2. **Template Resolver** (`src/resolvers/templateResolver.js`):
   - Update imports from `data/templates` to Atlassian Storage
   - Keep export signatures unchanged:
     - `getTemplates()` - returns all templates
     - `getTemplate({ templateId })` - returns single template
     - `getTemplateSuggestions({ issueTypeName })` - returns suggestions

3. **Custom Field** (`src/frontend/TemplateSelector.jsx`):
   - Currently imports from `../data/templates`
   - Can be modified to fetch from `template.getAll` resolver instead

4. **UIM Handler** (`src/uim/index.js`):
   - Currently imports from `../data/templates`
   - Can be modified to fetch from resolver or Storage API directly

## Development

### Build

```bash
npm run build:uim      # Build UI Modifications bundle
npm run watch:uim      # Watch mode
npm run lint           # Run ESLint
```

### Deploy

```bash
forge deploy           # Deploy to Atlassian
```

### Local Development

```bash
forge tunnel           # Proxy invocations locally
```

## Files Modified for Phase 1 Implementation

- `src/frontend/index.jsx`: Refactored ProjectSettings to single "Enable" button instead of per-issue-type buttons
- `src/resolvers/index.js`: Updated `uim.createForProject` to handle array of issue type IDs
- `src/data/templates.js`: Created new hardcoded template database (simulating storage)
- `src/frontend/TemplateSelector.jsx`: Updated to load templates from data file
- `src/uim/index.js`: Refactored to apply templates based on custom field selection
- `src/resolvers/templateResolver.js`: Re-enabled and refactored for template API endpoints

## Important Notes

- **Field IDs**: Currently hardcoded as `customfield_10000` for the Template field. Update based on actual field ID in your Jira instance.
- **Default Issue Types**: Bug issues get the "Bug Report" template by default. All others get "Feature Request".
- **ADF Format**: Descriptions use Atlassian Document Format (ADF). Edit in `src/data/templates.js`.

## Future Work

- [ ] Integrate with Atlassian Storage for persistent template management
- [ ] Build Template Library UI for creating/editing templates
- [ ] Add role-based template access control
- [ ] Support more field types (assignee, labels, custom fields)
- [ ] Template preview functionality
- [ ] Code cleanup and consolidation of legacy files

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app frontend by editing the `src/frontend/index.jsx` file.

- Modify your app backend by editing the `src/resolvers/index.js` file to define resolver functions. See [Forge resolvers](https://developer.atlassian.com/platform/forge/runtime-reference/custom-ui-resolver/) for documentation on resolver functions.

- Build and deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.
