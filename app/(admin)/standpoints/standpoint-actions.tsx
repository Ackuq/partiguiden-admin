'use client';

import deleteStandpoint from './actions/delete-standpoint';
import EditStandpointModal from './edit-standpoint-modal';
import { useState } from 'react';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';
import type { Standpoint } from '@prisma/client';

interface StandpointActionsProps {
  standpoint: Standpoint;
  parties: PartyWithAbbreviationAndName[];
  subjects: SubjectWithName[];
}

export default function StandpointActions({
  standpoint,
  parties,
  subjects,
}: StandpointActionsProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <EditStandpointModal
        standpoint={standpoint}
        subjects={subjects}
        parties={parties}
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
          window.confirm(
            `Säker på att du vill ta bort ${standpoint.title} (${standpoint.link})`
          );
          deleteStandpoint(standpoint.link);
        }}
      >
        ❌
      </button>
    </>
  );
}
