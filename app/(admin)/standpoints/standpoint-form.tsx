import Form, { Input, Select, SubmitButton } from '@components/form';
import { z } from 'zod';
import type { Standpoint } from '@prisma/client';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';

enum FormField {
  Link = 'link',
  Title = 'title',
  Content = 'content',
  UpdateDate = 'updateDate',
  PartyAbbreviation = 'partyAbbreviation',
  SubjectName = 'subjectName',
}

export const zStandpoint = z.object({
  [FormField.Link]: z.string().nonempty(),
  [FormField.Title]: z.string().nonempty(),
  [FormField.Content]: z.array(z.string().nonempty()).default([]),
  [FormField.UpdateDate]: z.string().optional(),
  [FormField.PartyAbbreviation]: z.string().nonempty(),
  [FormField.SubjectName]: z.string().nonempty(),
});

interface StandpointFormProps {
  onCreate: (formData: FormData) => void;
  zodIssues?: Zod.ZodIssue[];
  standpoint?: Standpoint;
  parties: PartyWithAbbreviationAndName[];
  subjects: SubjectWithName[];
}

export default function StandpointForm({
  onCreate,
  zodIssues,
  standpoint,
  parties,
  subjects,
}: StandpointFormProps) {
  return (
    <Form action={onCreate}>
      <Input
        error={zodIssues?.find((issue) => issue.path.includes(FormField.Link))}
        defaultValue={standpoint?.link}
        name={FormField.Link}
        type="text"
        placeholder="Länk"
      />
      <Input
        error={zodIssues?.find((issue) => issue.path.includes(FormField.Title))}
        defaultValue={standpoint?.title}
        name={FormField.Title}
        type="text"
        placeholder="Titel"
      />
      {/* TODO: Add content input */}
      <Select
        error={zodIssues?.find((issue) =>
          issue.path.includes(FormField.PartyAbbreviation)
        )}
        name={FormField.PartyAbbreviation}
        defaultValue={standpoint?.partyAbbreviation}
        placeholder="Parti"
        options={parties.map((party) => ({
          name: party.name,
          value: party.abbreviation,
        }))}
      />
      <Select
        error={zodIssues?.find((issue) =>
          issue.path.includes(FormField.SubjectName)
        )}
        name={FormField.SubjectName}
        placeholder="Sakområde"
        defaultValue={standpoint?.subjectName ?? undefined}
        options={subjects.map((subject) => ({
          name: subject.name,
          value: subject.name,
        }))}
      />

      <SubmitButton>Skicka</SubmitButton>
    </Form>
  );
}
