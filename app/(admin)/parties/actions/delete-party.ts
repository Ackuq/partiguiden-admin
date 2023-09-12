'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function deleteParty(abbreviation: string) {
  try {
    await prisma.party.delete({
      where: {
        abbreviation,
      },
    });
    revalidatePath(PAGES.parties.href);
  } catch (error) {
    return { message: 'Något gick snett med denna förfrågan' };
  }
}
