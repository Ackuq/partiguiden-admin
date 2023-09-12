import Form, { Input, SubmitButton } from '@components/form';
import type { Party } from '@prisma/client';
import { z } from 'zod';

enum FormField {
  Abbreviation = 'abbreviation',
  Name = 'name',
}

export const zParty = z.object({
  [FormField.Abbreviation]: z.string().nonempty(),
  [FormField.Name]: z.string().nonempty(),
});

interface PartyFormProps {
  onCreate: (formData: FormData) => void;
  zodIssues?: Zod.ZodIssue[];
  party?: Party;
}

export default function PartyForm({
  onCreate,
  zodIssues,
  party,
}: PartyFormProps) {
  return (
    <Form action={onCreate}>
      <Input
        error={zodIssues?.find((issue) =>
          issue.path.includes(FormField.Abbreviation)
        )}
        defaultValue={party?.abbreviation}
        name={FormField.Abbreviation}
        type="text"
        placeholder="Partiförkortning"
      />
      <Input
        error={zodIssues?.find((issue) => issue.path.includes(FormField.Name))}
        defaultValue={party?.name}
        name={FormField.Name}
        type="text"
        placeholder="Partinamn"
      />

      <SubmitButton>Skicka</SubmitButton>
    </Form>
  );
}
