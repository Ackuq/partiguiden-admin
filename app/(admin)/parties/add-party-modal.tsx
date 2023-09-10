'use client';
import Button from '@components/button';
import Input from '@components/form/input';
import Modal from '@components/modal';
import { PAGES } from '@lib/navigation';
import { useState } from 'react';
import { z } from 'zod';
import createParty from './create-party';
import { FormField } from './types';

interface AddPartyFormProps {
  onSuccess: () => void;
}

function AddPartyForm({ onSuccess }: AddPartyFormProps) {
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await createParty(formData);
    if (!error) {
      onSuccess();
      return;
    }
    // TODO: Proper error handling for errors other than zod
    setZodIssues(error?.zodIssues);
  }

  return (
    <form className="rounded px-8 py-6" action={onCreate}>
      <div className="mb-4">
        <Input
          error={zodIssues?.find((issue) =>
            issue.path.includes(FormField.Abbreviation)
          )}
          name={FormField.Abbreviation}
          type="text"
          placeholder="Partiförkortning"
        />
      </div>
      <Input
        error={zodIssues?.find((issue) => issue.path.includes('abbreviation'))}
        name="name"
        type="text"
        placeholder="Partinamn"
      />

      <div className="text-right mt-6">
        <Button type="submit">Skicka</Button>
      </div>
    </form>
  );
}

export default function AddPartyModal() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => {
    setIsModalOpened((prevState) => !prevState);
  };

  return (
    <>
      <Button onClick={toggleModal}>+ Add party</Button>
      <Modal onClose={toggleModal} isOpen={isModalOpened}>
        <AddPartyForm onSuccess={toggleModal} />
      </Modal>
    </>
  );
}
