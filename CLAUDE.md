Jira Template Manager
Project Overview
The Jira Template Manager is a web application designed to streamline ticket creation in Jira by allowing users to store and manage ticket templates. The application introduces a custom field called "Template," which appears as a dropdown menu on the Create Ticket screen. This dropdown displays templates stored in Atlassian Storage. When a user selects a template, the ticket is prefilled with fields such as Priority, Summary, and Issue Type.

Purpose
Expedite repetitive ticket creation.

Reduce manual input by prefilling fields based on selected templates.

Improve accessibility for non-technical users by minimizing configuration.

Current State
Prefill functionality is working for the Issue Type field.

The Template field is currently a text entry box rather than a dropdown.

Activation of the feature requires enabling through a custom Template Settings page built by a previous developer; this is distinct from Jira's standard administrative field configuration.

Issues
Complex Configuration: Custom Template Settings page must be used to explicitly enable the feature for each project space.

Template Field: Not yet a dropdown; only supports text entry.

Code Structure: Codebase is fragmented from rapid prototyping and troubleshooting.

Enablement Flow: Custom Template Settings Page
The Template Settings page is a custom-built UI within the project space, separate from standard Jira field/screen configuration.

This page controls whether the Template Manager feature is active for each Jira project, regardless of field admin settings.

The logic forces explicit enablement, adding a layer of project-specific access control beyond what Jira natively provides.

This enablement gate impacts onboarding and usability—non-technical users must activate it before seeing template-related features.

Approach
1. Understand & Refactor the Enablement Flow
Review logic of the custom Template Settings page to understand how and why the feature is enabled.

Consider replacing per-project enablement with a global “Enable All” button or toggle, exposed directly on the ticket creation screen or in simpler settings.

Clearly document that this enablement is app-specific and not part of standard Jira administration.

2. Code Refactoring for Prefill Functionality
Refactor code to minimize configuration—ideally, the prefill functionality should work by default.

Reduce logic tied to enabling per issue type, except where truly necessary for advanced workflows.

Plan for code cleanup after feature stabilization to remove Frankensteined or redundant files.

3. Implement Dropdown for Template Field
Begin with hardcoded template options in the dropdown to validate the UI and prefill logic.

Once stable, integrate dropdown with template options pulled dynamically from Atlassian Storage.

4. Integrate Template Custom Field
Refactor prefill logic to work off the Template custom field, not just the Issue Type.

Ensure Priority, Summary, and Issue Type can all be prefilled from selected template.

Important Notes
Code Cleanup: Perform code cleanup after feature stabilization to streamline the codebase and remove unused files.

User Accessibility: The goal is to require minimal configuration or enablement steps, especially for non-technical users.

Separation from Jira Admin: The Template Settings page is app-specific; Jira admins remain responsible for field/screen scheme configuration.

Next Steps
Audit the Template Settings page’s code and logic.

Simplify activation flow to require fewer user actions.

Prioritize making the dropdown and prefill logic robust and user-friendly.

Schedule code cleanup once all major features are stable.