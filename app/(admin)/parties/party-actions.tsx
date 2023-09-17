'use client';

import type { Party } from '@prisma/client';
import deleteParty from './actions/delete-party';
import EditPartyModal from './edit-party-modal';
import { useState } from 'react';
import { fetchPartyStandpoints } from './actions/fetch-party-standpoints';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

interface PartyActionsProps {
  party: Party;
}

export default function PartyActions({ party }: PartyActionsProps) {
  const { setStatus } = useStatus();
  const [isModalOpened, setIsModalOpened] = useState(false);

  async function handleUpdatePartyStandpoints() {
    const error = await fetchPartyStandpoints(party.abbreviation);
    if (error) {
      setStatus({
        message: error.message,
        level: StatusLevel.Error,
      });
    } else {
      setStatus({
        message: 'Lyckades uppdatera ståndpunkter',
        level: StatusLevel.Success,
      });
    }
  }

  async function handleDeleteParty() {
    const response = window.confirm(
      `Säker på att du vill ta bort ${party.name} (${party.abbreviation})`
    );
    if (!response) {
      return;
    }
    const error = await deleteParty(party.abbreviation);
    if (error) {
      setStatus({
        message: error.message,
        level: StatusLevel.Error,
      });
    } else {
      setStatus({
        message: 'Lyckades ta bort parti',
        level: StatusLevel.Success,
      });
    }
  }

  return (
    <>
      <EditPartyModal
        party={party}
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
      <button onClick={handleUpdatePartyStandpoints}>🔄</button>
      <button onClick={handleDeleteParty}>❌</button>
    </>
  );
}
