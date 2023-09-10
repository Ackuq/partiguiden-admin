'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { FormField } from './types';

const zParty = z.object({
  [FormField.Abbreviation]: z.string().nonempty(),
  [FormField.Name]: z.string().nonempty(),
});

export default async function createParty(formData: FormData) {
  try {
    const json = Object.fromEntries(formData.entries());
    const party = zParty.parse(json);
    await prisma.party.create({
      data: party,
    });
    revalidatePath(PAGES.parties.href);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { zodIssues: error.errors };
    }
    return { message: 'Något gick snett med denna förfrågan' };
  }
}
