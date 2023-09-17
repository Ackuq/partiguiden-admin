'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import type { Standpoint } from '@prisma/client';
import handleServerError from '@lib/handleServerError';

export default async function updateSubject(
  standpointsPrisma: Standpoint,
  newSubject: string
) {
  try {
    await prisma.standpoint.update({
      where: {
        link: standpointsPrisma.link,
      },
      data: {
        subjectName: newSubject,
      },
    });
    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    return handleServerError(error);
  }
}
