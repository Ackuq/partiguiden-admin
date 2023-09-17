'use client';
import Button from '@components/button';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import createParty from './actions/create-party';
import PartyForm from './party-form';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

export default function AddPartyModal() {
  const { setStatus } = useStatus();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await createParty(formData);
    if (!error) {
      toggleModal();
      setStatus({
        message: 'Lyckades lägga till parti!',
        level: StatusLevel.Success,
      });
      return;
    }
    setZodIssues(error?.zodIssues);
    setStatus({ message: error.message, level: StatusLevel.Error });
  }

  return (
    <>
      <Button onClick={toggleModal}>+ Lägg till parti</Button>
      <Modal onClose={toggleModal} isOpen={isModalOpened}>
        <PartyForm onCreate={onCreate} zodIssues={zodIssues} />
      </Modal>
    </>
  );
}
