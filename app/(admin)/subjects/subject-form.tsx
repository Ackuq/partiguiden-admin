import Form, { Input, Select, SubmitButton } from '@components/form';
import { z } from 'zod';
import type { SubjectWithRelated } from './prisma';

enum FormField {
  Name = 'name',
  RelatedSubject = 'relatedSubjects',
}

export const zSubject = z.object({
  [FormField.Name]: z.string().nonempty(),
  [FormField.RelatedSubject]: z.array(z.string().nonempty()).default([]),
});

interface SubjectFormProps {
  onCreate: (formData: FormData) => void;
  zodIssues?: Zod.ZodIssue[];
  subject?: SubjectWithRelated;
  subjects: SubjectWithRelated[];
}

export default function SubjectForm({
  onCreate,
  zodIssues,
  subject,
  subjects,
}: SubjectFormProps) {
  return (
    <Form action={onCreate}>
      <Input
        error={zodIssues?.find((issue) => issue.path.includes(FormField.Name))}
        defaultValue={subject?.name}
        name={FormField.Name}
        type="text"
        placeholder="Namn"
      />
      <Select
        error={zodIssues?.find((issue) =>
          issue.path.includes(FormField.RelatedSubject)
        )}
        multiple
        name={FormField.RelatedSubject}
        placeholder="Relaterade ämnen"
        options={subjects.map((relatedSubject) => ({
          name: relatedSubject.name,
          value: relatedSubject.name,
          selected: !!subject?.relatedSubjects.find(
            (related) => related.name === relatedSubject.name
          ),
        }))}
      />

      <SubmitButton>Skicka</SubmitButton>
    </Form>
  );
}
