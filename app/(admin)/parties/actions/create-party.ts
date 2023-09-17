'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { zParty } from '../party-form';
import handleServerError from '@lib/handleServerError';

export default async function createParty(formData: FormData) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zParty.parse(json);
    await prisma.party.create({
      data,
    });
    revalidatePath(PAGES.parties.href);
  } catch (error) {
    return handleServerError(error);
  }
}
