# Jira Template Manager - Setup Instructions

## Overview

The Template Manager app has been deployed, but additional Jira configuration is required to make the custom field visible and functional.

## Configuration Steps

### Step 1: Add Custom Field to Create Issue Screen

The custom field `Template` has been created by the app, but it needs to be added to the **Create Issue screen** to be visible to users.

**Steps:**
1. Go to **Jira Settings** → **Issues** → **Screens** (or **Custom Fields** → **Screens**)
2. Find the **Create Issue Screen** (typically named "Create issue screen" or similar)
3. Click **Configure**
4. Click **Add Field** (or **Add custom field to screen**)
5. Search for **"Template"** (the custom field created by the app)
6. Select it and save

### Step 2: Verify Field is in the Screen Scheme

After adding the field to the screen, verify it's linked to your project:

1. Go to **Jira Settings** → **Issues** → **Screen Schemes**
2. Find the screen scheme used by your project (e.g., "Default Issue Type Screen Scheme")
3. Verify that the **Create Issue Screen** is configured with the Template field

### Step 3: Enable Template Manager in Project Settings

Once the custom field is visible in the Create Issue dialog:

1. Go to your **Project Settings** → **Template Manager Settings** (or **Apps** → **Template Manager Settings**)
2. Click **Enable Template Manager**
3. This will register the UI Modification that enables prefill functionality

### Step 4: Test the Feature

1. Go to **Create Issue** in your project
2. You should see the **Template** field in the form
3. Select a template from the dropdown
4. Fields should prefill based on your selection

## Troubleshooting

### Template Field Not Visible in Create Issue

**Problem:** The `Template` custom field doesn't appear in the Create Issue dialog

**Solution:**
- Confirm the field is added to the Create Issue Screen (see Step 1)
- Check that the screen scheme is applied to your project
- Clear browser cache and refresh

### Dropdown Shows No Options

**Problem:** The Template dropdown appears but has no template options

**Solution:**
- Check browser console for errors (F12 → Console tab)
- Look for messages like "Loaded options:" to verify templates are loading
- Verify `src/data/templates.js` has template definitions

### Prefill Not Working

**Problem:** Selecting a template doesn't prefill fields

**Solution:**
- Verify Template Manager is enabled in Project Settings
- Check browser console for "[UIM]" messages indicating prefill logic is running
- Check that the template selection is actually saved (look for custom field value in the form)

### Debug Information

If issues persist, check the browser console (F12) for these debug messages:

**Custom Field Component:**
```
[TemplateSelectorField] Loading template options...
[TemplateSelectorField] Loaded options: [...]
[TemplateSelectorField] Selection changed: tmpl-001
[TemplateSelectorField] Submitting value: tmpl-001
```

**UIM Prefill:**
```
[UIM] Attempting to get template field with ID: customfield_10058
[UIM] Template field object: {...}
[UIM] Template field value: tmpl-001
[UIM] Applying template: Bug Report
```

If you see "Template field not found!" warning, the field isn't added to the Create Issue screen.

## Architecture Notes

- **Custom Field Type**: `tmpl-picker` (created by app)
- **Custom Field ID**: `customfield_10058` (assigned by Jira - verify this in the field's configuration page)
- **Prefill Trigger**: UIM on Create Issue dialog (GIC)
- **Template Storage**: Currently hardcoded in `src/data/templates.js`

## Next Steps After Setup

Once the custom field is working:

1. Test template selection and prefill
2. Collect feedback on template options
3. Work with your teammate to integrate Atlassian Storage for persistent template management
4. Add more templates as needed
