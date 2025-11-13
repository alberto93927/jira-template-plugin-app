# Debug Guide for Template Manager

## How to Check Browser Console

1. Open Create Issue dialog in Jira
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for messages starting with `[UIM]` or `[TemplateSelectorField]`

## Key Debug Messages

### Custom Field Component Loading

```
[TemplateSelectorField] Loading template options...
[TemplateSelectorField] Loaded options: [
  {label: "Bug Report", value: "tmpl-001"},
  {label: "Feature Request", value: "tmpl-002"},
  {label: "Task", value: "tmpl-003"}
]
```

**What it means:** Template options loaded successfully from `src/data/templates.js`

### Custom Field Component Interaction

```
[TemplateSelectorField] Selection changed: tmpl-001
[TemplateSelectorField] Submitting value: tmpl-001
[TemplateSelectorField] Value submitted successfully
```

**What it means:** User selected a template and it was submitted to Jira

### UIM Initialization

```
[UIM] Extension context: {type: "jira:uiModifications", viewType: "GIC", ...}
[UIM] Fields snapshot: { issuetype, summary, priority, description, ... }
[UIM] Attempting to get template field with ID: customfield_10058
[UIM] Template field object: {...}
[UIM] Template field value: tmpl-001
[UIM] Applying template: Bug Report
```

**What it means:** UIM successfully read the template field and applied prefill

### Common Error Messages

#### "Template field not found!"

```
[UIM] Attempting to get template field with ID: customfield_10058
[UIM] Template field object: undefined
⚠️ [UIM] Template field not found! Field may not be added to Create Issue screen.
```

**Causes:**
- Custom field not added to Create Issue screen
- Custom field ID is different than `customfield_10058`
- Field is not visible to the current user

**Fix:**
1. Go to Jira Settings → Issues → Screens
2. Add the Template field to Create Issue Screen
3. Verify field ID in custom field settings

#### "Template not found: tmpl-001"

```
[UIM] Selected template ID: tmpl-001
⚠️ [UIM] Template not found: tmpl-001
```

**Causes:**
- Template ID doesn't exist in `src/data/templates.js`
- Template data didn't load properly

**Fix:**
- Check that `src/data/templates.js` has the template ID
- Check browser console for template loading errors

#### "No template selected, using issue type default"

```
[UIM] No template selected, using issue type default
[UIM] Applying template: Feature Request
```

**What it means:** Custom field is either not on screen or has no value selected. App is falling back to issue-type-based prefill.

## How to Find the Actual Custom Field ID

If `customfield_10058` is incorrect, find the real ID:

1. Go to **Jira Settings** → **Custom Fields**
2. Find the **Template** field
3. Click the field name to open its configuration
4. Look at the URL: `https://[domain]/secure/admin/EditCustomFieldDetails.jspa?id=customfield_XXXXX`
5. The `XXXXX` is the field ID

Then update in `src/uim/index.js`:
```javascript
const templateField = getFieldById('customfield_XXXXX'); // Use actual ID
```

And in the field watch array:
```javascript
return ['description', 'summary', 'priority', 'customfield_XXXXX'];
```

## Testing Checklist

- [ ] Custom field "Template" is visible in Create Issue screen
- [ ] Dropdown shows all 3 templates (Bug Report, Feature Request, Task)
- [ ] Can select a template without errors
- [ ] Console shows `[TemplateSelectorField] Value submitted successfully`
- [ ] Selecting a template triggers `[UIM] Template field value:` message
- [ ] Fields are prefilled after selection:
  - [ ] Priority is set
  - [ ] Summary has template prefix
  - [ ] Description has template content
- [ ] Changing the template selection re-applies prefill

## Performance Notes

- Template options load synchronously from `src/data/templates.js` (very fast)
- Prefill happens in UIM `onInit` hook (runs when Create Issue dialog opens)
- Once integrated with Atlassian Storage, template loading may become async

## Common Issues & Solutions

### Issue: Dropdown appears but with no options

**Solution:** Check console for `[TemplateSelectorField] Loaded options:` message
- If message doesn't appear, template loading failed
- If empty array, `getTemplateOptions()` returned nothing

### Issue: Selecting template doesn't trigger prefill

**Solution:**
1. Check if template field is actually in the snapshot: `[UIM] Fields snapshot:`
2. Check if custom field ID is correct
3. Try viewing the field value with browser DevTools (inspect element)

### Issue: Prefill works for issue type but not for template selection

**Solution:**
- Verify custom field is on the Create Issue screen
- Check console for field loading errors
- Verify field value is actually being saved (inspect element on field)

## Re-Deploying After Changes

```bash
# Build UIM bundle
npm run build:uim

# Deploy to Jira
forge deploy

# Check deployment status
forge deploy --verbose
```

The app should deploy to version 6.189.0+ with your changes live immediately.
