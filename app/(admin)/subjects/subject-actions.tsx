'use client';

import deleteSubject from './actions/delete-subject';
import EditSubjectModal from './edit-subject-modal';
import { useState } from 'react';
import type { SubjectWithRelated } from './prisma';

interface SubjectActionsProps {
  subject: SubjectWithRelated;
  subjects: SubjectWithRelated[];
}

export default function SubjectActions({
  subject,
  subjects,
}: SubjectActionsProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);

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
      <button
        onClick={() => {
          window.confirm(`Säker på att du vill ta bort ${subject.name}`);
          deleteSubject(subject.name);
        }}
      >
        ❌
      </button>
    </>
  );
}
