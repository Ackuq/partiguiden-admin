'use client';
import Modal from '@components/modal';
import { useState } from 'react';
import { z } from 'zod';
import editSubject from './actions/edit-subject';
import SubjectForm from './subject-form';
import type { SubjectWithRelated } from './prisma';

interface EditSubjectModalProps {
  subject: SubjectWithRelated;
  subjects: SubjectWithRelated[];
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditSubjectModal({
  subject,
  subjects,
  isModalOpened,
  setIsModalOpened,
}: EditSubjectModalProps) {
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await editSubject(subject, formData);
    if (!error) {
      toggleModal();
      return;
    }
    // TODO: Proper error handling for errors other than zod
    setZodIssues(error?.zodIssues);
  }

  return (
    <Modal onClose={toggleModal} isOpen={isModalOpened}>
      <SubjectForm
        onCreate={onCreate}
        zodIssues={zodIssues}
        subject={subject}
        subjects={subjects}
      />
    </Modal>
  );
}
