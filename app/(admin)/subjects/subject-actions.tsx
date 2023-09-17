'use client';

import deleteSubject from './actions/delete-subject';
import EditSubjectModal from './edit-subject-modal';
import { useState } from 'react';
import type { SubjectWithRelated } from './prisma';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

interface SubjectActionsProps {
  subject: SubjectWithRelated;
  subjects: SubjectWithRelated[];
}

export default function SubjectActions({
  subject,
  subjects,
}: SubjectActionsProps) {
  const { setStatus } = useStatus();
  const [isModalOpened, setIsModalOpened] = useState(false);

  async function handleDeleteSubject() {
    const response = window.confirm(
      `Säker på att du vill ta bort ${subject.name}`
    );
    if (!response) {
      return;
    }
    const error = await deleteSubject(subject.name);
    if (error) {
      setStatus({
        message: error.message,
        level: StatusLevel.Error,
      });
    } else {
      setStatus({
        message: 'Lyckades ta bort ståndpunkt',
        level: StatusLevel.Success,
      });
    }
  }

  return (
    <>
      <EditSubjectModal
        subject={subject}
        subjects={subjects}
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
      />
      <button
        onClick={() => {
          setIsModalOpened(true);
        }}
      >
        ✏️
      </button>
      <button onClick={handleDeleteSubject}>❌</button>
    </>
  );
}
