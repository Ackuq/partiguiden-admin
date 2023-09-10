'use client';

import type { Party } from '@prisma/client';
import deleteParty from './actions/delete-party';
import EditPartyModal from './edit-party-modal';
import { useState } from 'react';

interface PartyActionsProps {
  party: Party;
}

export default function PartyActions({ party }: PartyActionsProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);

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
      <button
        onClick={() => {
          window.confirm(
            `Säker på att du vill ta bort ${party.name} (${party.abbreviation})`
          );
          deleteParty(party.abbreviation);
        }}
      >
        ❌
      </button>
    </>
  );
}
