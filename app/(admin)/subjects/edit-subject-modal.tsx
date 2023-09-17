'use client';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import editSubject from './actions/edit-subject';
import SubjectForm from './subject-form';
import type { SubjectWithRelated } from './prisma';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

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
  const { setStatus } = useStatus();
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await editSubject(subject, formData);
    if (!error) {
      toggleModal();
      setStatus({
        message: 'Lyckades ändra sakområde!',
        level: StatusLevel.Success,
      });
      return;
    }
    setZodIssues(error?.zodIssues);
    setStatus({ message: error.message, level: StatusLevel.Error });
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
