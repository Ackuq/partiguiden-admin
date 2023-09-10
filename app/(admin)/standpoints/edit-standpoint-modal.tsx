'use client';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import editStandpoint from './actions/edit-standpoint';
import StandpointForm from './standpoint-form';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';
import type { Standpoint } from '@prisma/client';

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
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await editStandpoint(standpoint, formData);
    if (!error) {
      toggleModal();
      return;
    }
    // TODO: Proper error handling for errors other than zod
    setZodIssues(error?.zodIssues);
  }

  return (
    <Modal onClose={toggleModal} isOpen={isModalOpened}>
      <StandpointForm
        onCreate={onCreate}
        zodIssues={zodIssues}
        standpoint={standpoint}
        subjects={subjects}
        parties={parties}
      />
    </Modal>
  );
}
