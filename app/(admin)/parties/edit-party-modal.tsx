'use client';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import editParty from './actions/edit-party';
import PartyForm from './party-form';
import type { Party } from '@prisma/client';
import { StatusLevel, useStatus } from '@app/(status)/status-context';

interface EditPartyModalProps {
  party: Party;
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPartyModal({
  party,
  isModalOpened,
  setIsModalOpened,
}: EditPartyModalProps) {
  const { setStatus } = useStatus();
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await editParty(party, formData);
    if (!error) {
      toggleModal();
      setStatus({
        message: 'Lyckades uppdatera parti!',
        level: StatusLevel.Success,
      });
      return;
    }
    setZodIssues(error?.zodIssues);
    setStatus({ message: error.message, level: StatusLevel.Error });
  }

  return (
    <Modal onClose={toggleModal} isOpen={isModalOpened}>
      <PartyForm onCreate={onCreate} zodIssues={zodIssues} party={party} />
    </Modal>
  );
}
