'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { zStandpoint } from '../types';
import type { Standpoint } from '@prisma/client';
import handleServerError from '@lib/handleServerError';

export default async function editStandpoint(
  standpointsPrisma: Standpoint,
  formData: FormData
) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zStandpoint.parse({
      ...json,
      content: formData.getAll('content'),
    });
    await prisma.standpoint.update({
      where: {
        link: standpointsPrisma.link,
      },
      data,
    });

    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    return handleServerError(error);
  }
}
