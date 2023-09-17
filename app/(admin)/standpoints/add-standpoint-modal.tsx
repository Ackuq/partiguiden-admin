'use client';
import Button from '@components/button';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import createStandpoint from './actions/create-standpoint';
import StandpointForm from './standpoint-form';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

interface AddStandpointModalProps {
  parties: PartyWithAbbreviationAndName[];
  subjects: SubjectWithName[];
}

export default function AddStandpointModal({
  parties,
  subjects,
}: AddStandpointModalProps) {
  const { setStatus } = useStatus();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await createStandpoint(formData);
    if (!error) {
      toggleModal();
      setStatus({
        message: 'Lyckades lägga till ståndpunkt!',
        level: StatusLevel.Success,
      });
      return;
    }
    setZodIssues(error?.zodIssues);
    setStatus({ message: error.message, level: StatusLevel.Error });
  }

  return (
    <>
      <Button onClick={toggleModal}>+ Lägg till ståndpunkt</Button>
      <Modal onClose={toggleModal} isOpen={isModalOpened}>
        <StandpointForm
          parties={parties}
          subjects={subjects}
          onCreate={onCreate}
          zodIssues={zodIssues}
          setZodIssues={setZodIssues}
        />
      </Modal>
    </>
  );
}
