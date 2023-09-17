'use client';

import deleteStandpoint from './actions/delete-standpoint';
import EditStandpointModal from './edit-standpoint-modal';
import { useState } from 'react';
import type { PartyWithAbbreviationAndName, SubjectWithName } from './prisma';
import type { Standpoint } from '@prisma/client';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

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
  const { setStatus } = useStatus();
  const [isModalOpened, setIsModalOpened] = useState(false);

  async function handleDeleteStandpoint() {
    const response = window.confirm(
      `Säker på att du vill ta bort ${standpoint.title} (${standpoint.link})`
    );
    if (!response) {
      return;
    }
    const error = await deleteStandpoint(standpoint.link);
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
      <button onClick={handleDeleteStandpoint}>❌</button>
    </>
  );
}
