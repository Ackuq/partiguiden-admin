'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zParty } from '../party-form';

export default async function createParty(formData: FormData) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zParty.parse(json);
    await prisma.party.create({
      data,
    });
    revalidatePath(PAGES.parties.href);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { zodIssues: error.errors };
    }
    return { message: 'Något gick snett med denna förfrågan' };
  }
}
