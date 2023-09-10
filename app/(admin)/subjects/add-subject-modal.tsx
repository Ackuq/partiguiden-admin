'use client';
import Button from '@components/button';
import Modal from '@components/modal';
import { useState } from 'react';
import { z } from 'zod';
import createSubject from './actions/create-subject';
import SubjectForm from './subject-form';
import { SubjectWithRelated } from './prisma';

interface AddSubjectModalProps {
  subjects: SubjectWithRelated[];
}

export default function AddSubjectModal({ subjects }: AddSubjectModalProps) {
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
      return;
    }
    // TODO: Proper error handling for errors other than zod
    setZodIssues(error?.zodIssues);
  }

  return (
    <>
      <Button onClick={toggleModal}>+ Lägg till ämne</Button>
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
