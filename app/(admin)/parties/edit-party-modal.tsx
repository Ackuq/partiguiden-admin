'use client';
import Modal from '@components/modal';
import { useState } from 'react';
import type { z } from 'zod';
import editParty from './actions/edit-party';
import PartyForm from './party-form';
import type { Party } from '@prisma/client';

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
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>();

  function toggleModal() {
    setIsModalOpened((prevState) => !prevState);
  }

  async function onCreate(formData: FormData) {
    setZodIssues(undefined);
    const error = await editParty(party, formData);
    if (!error) {
      toggleModal();
      return;
    }
    // TODO: Proper error handling for errors other than zod
    setZodIssues(error?.zodIssues);
  }

  return (
    <Modal onClose={toggleModal} isOpen={isModalOpened}>
      <PartyForm onCreate={onCreate} zodIssues={zodIssues} party={party} />
    </Modal>
  );
}
