'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zStandpoint } from '../standpoint-form';
import type { Standpoint } from '@prisma/client';

export default async function editStandpoint(
  standpointsPrisma: Standpoint,
  formData: FormData
) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zStandpoint.parse(json);

    await prisma.standpoint.update({
      where: {
        link: standpointsPrisma.link,
      },
      data,
    });

    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { zodIssues: error.errors };
    }
    return { message: 'Något gick snett med denna förfrågan' };
  }
}
