// File path: src/frontend/index.jsx
import React, { useEffect, useState } from 'react';
import ForgeReconciler, {
  Text,
  Button,
  Stack,
  SectionMessage,
  Select,
  Box,
} from '@forge/react';
import { invoke, view } from '@forge/bridge';
import { getTemplateOptions, getTemplateById } from '../data/templates';

const ApplyTemplate = ({ issueId, projectId }) => {
  const [msg, setMsg] = useState('Pick a template…');
  return (
    <Stack space="space.200">
      <Text>Apply a template to issue {issueId}</Text>
      <Button onClick={async () => {
        // later: invoke('applyTemplate', { issueId, templateId })
        const data = await invoke('getText', { example: 'apply-click' });
        setMsg(String(data));
      }}>Apply</Button>
      <SectionMessage appearance="information">{msg}</SectionMessage>
    </Stack>
  );
};

const ProjectLibrary = ({ projectId }) => {
  const [data, setData] = useState('Loading templates…');
  useEffect(() => { invoke('getText', { example: `list-${projectId}` }).then((d) => setData(String(d))); }, [projectId]);
  return <Text>Team Template Library for project {projectId}. {data}</Text>;
};

// Template custom field component
const TemplateSelectorField = () => {
  const [ctx, setCtx] = useState(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);

  // Initialize context and load templates
  useEffect(() => {
    Promise.all([
      view.getContext(),
      (async () => {
        try {
          const templateOptions = getTemplateOptions();
          const selectOptions = templateOptions.map((tmpl) => ({
            label: tmpl.name,
            value: tmpl.id,
          }));
          setOptions(selectOptions);
          console.log('[TemplateSelector] Loaded options:', selectOptions);
        } catch (e) {
          console.error('[TemplateSelector] Failed to load templates:', e);
        }
        setLoading(false);
      })(),
    ]).then(([context]) => {
      console.log('[TemplateSelector] Context:', context);
      setCtx(context);
      // Set the initial value from context if available
      if (context?.value) {
        setValue(context.value);
      }
    });
  }, []);

  if (loading || !ctx) {
    return <Text>Loading templates…</Text>;
  }

  // View mode - display selected template name
  if (!ctx.extension?.isEditing) {
    if (!value) {
      return <Text>No template selected</Text>;
    }
    const template = getTemplateById(value);
    if (!template) {
      return <Text>Unknown template</Text>;
    }
    return <Text>{template.name}</Text>;
  }

  // Edit mode - display dropdown selector
  return (
    <Box>
      <Select
        label="Template"
        placeholder="Choose a template to prefill fields"
        options={options}
        value={value ? { label: getTemplateById(value)?.name || '', value } : null}
        onChange={(newValue) => {
          const selectedValue = newValue ? newValue.value : '';
          console.log('[TemplateSelector] Selection changed:', selectedValue);
          setValue(selectedValue);
        }}
        isSearchable
        isClearable
      />
    </Box>
  );
};

const ProjectSettings = () => {
  const [ctx, setCtx] = useState(null);
  const [msg, setMsg] = useState('Idle');
  const [issueTypes, setIssueTypes] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Grab context once
  useEffect(() => {
    const init = async () => {
      console.log('[ProjectSettings] Mounting and fetching context...');
      try {
        const initialContext = await view.getContext();
        console.log('[ProjectSettings] Initial context received:', initialContext);
        setCtx(initialContext);
      } catch (error) {
        console.error('[ProjectSettings] Failed to get initial context:', error);
        setMsg('Error: Could not load context from Jira.');
      }
    };
    init();
  }, []);

  // Resolve projectId (works across project settings surfaces)
  useEffect(() => {
    const pid =
      ctx?.extension?.project?.id ??
      ctx?.platformContext?.projectId ??
      ctx?.project?.id;
    console.log('[ProjectSettings] Resolved projectId:', pid);
    setProjectId(pid);
  }, [ctx]);

  // Load issue types for this project
  useEffect(() => {
    (async () => {
      if (!projectId) return;
      try {
        const types = await invoke('jira.issueTypesForProject', { projectId: String(projectId) });
        console.log('[ProjectSettings] Fetched issue types:', types);
        setIssueTypes(types || []);
      } catch (e) {
        setMsg(`Failed to load issue types: ${e.message || e}`);
        console.error('[ProjectSettings] Failed to load issue types:', e);
      }
    })();
  }, [projectId]);

  // Check if feature is already enabled for this project
  useEffect(() => {
    (async () => {
      if (!projectId) return;
      try {
        const list = await invoke('uim.list');
        const pid = String(projectId);
        const hasUim = (list?.values || []).some((v) =>
          (v.contexts || []).some(
            (c) => String(c.projectId) === pid && c.viewType === 'GIC'
          )
        );
        setIsEnabled(hasUim);
      } catch (e) {
        console.error('[ProjectSettings] Failed to check UIM status:', e);
      }
    })();
  }, [projectId]);

  const handleToggleFeature = async () => {
    if (!projectId || issueTypes.length === 0) return;

    setIsLoading(true);
    try {
      await invoke('uim.createForProject', {
        projectId: String(projectId),
        issueTypeIds: issueTypes.map((t) => String(t.id)),
      });
      setIsEnabled(true);
      setMsg(`Template Manager enabled for all ${issueTypes.length} issue type(s) in this project.`);
    } catch (e) {
      setMsg(`Error: ${e.message || e}`);
      console.error('[ProjectSettings] Failed to enable feature:', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!ctx) return <Text>Loading…</Text>;
  return (
    <Stack space="space.200">
      <Text>Template Manager Settings</Text>
      <Text>Project: {String(projectId || 'N/A')}</Text>

      <SectionMessage appearance={isEnabled ? 'success' : 'information'}>
        {isEnabled
          ? 'Template Manager is enabled for this project.'
          : 'Template Manager is not enabled for this project.'}
      </SectionMessage>

      <Button
        appearance={isEnabled ? 'primary' : 'default'}
        onClick={handleToggleFeature}
        isDisabled={isLoading || issueTypes.length === 0}
      >
        {isLoading ? 'Enabling…' : isEnabled ? 'Feature Enabled' : 'Enable Template Manager'}
      </Button>

      <Text size="small">
        Enabling will activate Template Manager for all {issueTypes.length} issue type(s): {issueTypes.map((t) => t.name).join(', ')}
      </Text>

      <SectionMessage appearance="information">{msg}</SectionMessage>
    </Stack>
  );
};

const App = () => {
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const init = async () => {
        console.log('[App] Mounting and fetching context...');
        try {
            const initialContext = await view.getContext();
            console.log('[App] Initial context received:', initialContext);
            setCtx(initialContext);
        } catch (error) {
            console.error('[App] Failed to get initial context:', error);
        }
    };
    init();
  }, []);

  if (!ctx) return <Text>Loading…</Text>;

  // Context commonly exposes the moduleKey and platform info
  const moduleKey = ctx.moduleKey;
  const platform = ctx.platformContext || {};
  const projectId = platform.projectId;
  const issueId = platform.issueId;

  // Check if this is a custom field context
  if (ctx.extension?.isEditing !== undefined || ctx.fieldValue !== undefined) {
    return <TemplateSelectorField />;
  }

  // Simple router by module key (keeps one bundle for all modules)
  if (moduleKey === 'tmpl-create-uim') return <ApplyTemplate issueId={issueId} projectId={projectId} />;
  if (moduleKey === 'tmpl-apply') return <ApplyTemplate issueId={issueId} projectId={projectId} />;
  if (moduleKey === 'tmpl-project-library') return <ProjectLibrary projectId={projectId} />;
  if (moduleKey === 'tmpl-project-settings') return <ProjectSettings projectId={projectId} />;

  return <></>;
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
