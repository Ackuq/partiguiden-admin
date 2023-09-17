'use client';
import Button from '@components/button';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import createSubject from './actions/create-subject';
import SubjectForm from './subject-form';
import type { SubjectWithRelated } from './prisma';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

interface AddSubjectModalProps {
  subjects: SubjectWithRelated[];
}

export default function AddSubjectModal({ subjects }: AddSubjectModalProps) {
  const { setStatus } = useStatus();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await createSubject(formData);
    if (!error) {
      toggleModal();
      setStatus({
        message: 'Lyckades lägga till sakområde!',
        level: StatusLevel.Success,
      });
      return;
    }
    setZodIssues(error?.zodIssues);
    setStatus({ message: error.message, level: StatusLevel.Error });
  }

  return (
    <>
      <Button onClick={toggleModal}>+ Lägg till sakområde</Button>
      <Modal onClose={toggleModal} isOpen={isModalOpened}>
        <SubjectForm
          onCreate={onCreate}
          subjects={subjects}
          zodIssues={zodIssues}
        />
      </Modal>
    </>
  );
}
