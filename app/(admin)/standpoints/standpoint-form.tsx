'use client';
import Form, { Input, Select, SubmitButton, TextArea } from '@components/form';
import type { Standpoint } from '@prisma/client';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';
import { useState } from 'react';
import Button, { BaseButton } from '@components/button';
import { FormField } from './types';

interface StandpointFormProps {
  onCreate: (formData: FormData) => void;
  zodIssues?: Zod.ZodIssue[];
  setZodIssues: React.Dispatch<
    React.SetStateAction<Zod.ZodIssue[] | undefined>
  >;
  standpoint?: Standpoint;
  parties: PartyWithAbbreviationAndName[];
  subjects: SubjectWithName[];
}

export default function StandpointForm({
  onCreate,
  setZodIssues,
  zodIssues,
  standpoint,
  parties,
  subjects,
}: StandpointFormProps) {
  const [contentFields, setContentFields] = useState(
    standpoint?.content.map((content) => ({
      content,
      uuid: window.crypto.randomUUID(),
    })) ?? []
  );

  function removeContentField(uuid: string) {
    setContentFields((prevState) =>
      prevState.filter((field) => field.uuid !== uuid)
    );
  }

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
      {contentFields?.map((field, index) => (
        <TextArea
          key={field.uuid}
          defaultValue={field.content}
          error={zodIssues?.find(
            (issue) =>
              issue.path.includes(FormField.Content) &&
              issue.path.includes(index)
          )}
          rows={7}
          name={FormField.Content}
          placeholder="Innehåll"
          rightContent={
            <BaseButton
              type="button"
              onClick={() => {
                setZodIssues(undefined);
                removeContentField(field.uuid);
              }}
              className="ml-3 bg-red-600 text-white whitespace-nowrap self-start"
            >
              − Ta bort
            </BaseButton>
          }
        />
      ))}
      <Button
        className="mb-6"
        type="button"
        onClick={() => {
          setZodIssues(undefined);
          setContentFields((prevState) => [
            ...prevState,
            { content: '', uuid: window.crypto.randomUUID() },
          ]);
        }}
      >
        + Lägg till mer innehåll
      </Button>
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
