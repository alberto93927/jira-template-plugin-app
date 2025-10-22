import { Select } from '@forge/react';
const SelectSingleExample = () => (
  <>
    <Label labelFor="single-select-example">What template do you want to use?</Label>
    <Select
      id="single-select-example"
      options={[
        { label: 'Ticket A', value: 'ticket a' },
        { label: 'Ticket B', value: 'ticket b' },
      ]}
      placeholder="Choose a ticket template"
    />
  </>
);
