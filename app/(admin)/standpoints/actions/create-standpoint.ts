'use server';
import { PAGES } from '@lib/navigation';
import { revalidatePath } from 'next/cache';
import { zStandpoint } from '../types';
import prisma from '@lib/prisma';
import handleServerError from '@lib/handleServerError';

export default async function createStandpoint(formData: FormData) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zStandpoint.parse({
      ...json,
      content: formData.getAll('content'),
    });

    await prisma.standpoint.create({
      data,
    });

    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    return handleServerError(error);
  }
}
