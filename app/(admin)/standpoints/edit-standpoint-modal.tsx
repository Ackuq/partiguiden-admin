'use client';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import editStandpoint from './actions/edit-standpoint';
import StandpointForm from './standpoint-form';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';
import type { Standpoint } from '@prisma/client';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

interface EditStandpointModalProps {
  standpoint: Standpoint;
  parties: PartyWithAbbreviationAndName[];
  subjects: SubjectWithName[];
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditStandpointModal({
  standpoint,
  subjects,
  parties,
  isModalOpened,
  setIsModalOpened,
}: EditStandpointModalProps) {
  const { setStatus } = useStatus();
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await editStandpoint(standpoint, formData);
    if (!error) {
      toggleModal();
      setStatus({
        message: 'Lyckades redigera till ståndpunkt!',
        level: StatusLevel.Success,
      });
      return;
    }
    setZodIssues(error?.zodIssues);
    setStatus({ message: error.message, level: StatusLevel.Error });
  }

  return (
    <Modal onClose={toggleModal} isOpen={isModalOpened}>
      <StandpointForm
        onCreate={onCreate}
        zodIssues={zodIssues}
        setZodIssues={setZodIssues}
        standpoint={standpoint}
        subjects={subjects}
        parties={parties}
      />
    </Modal>
  );
}
