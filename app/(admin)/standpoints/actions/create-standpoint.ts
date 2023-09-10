'use server';
import { PAGES } from '@lib/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zStandpoint } from '../standpoint-form';
import prisma from '@lib/prisma';

export default async function createStandpoint(formData: FormData) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zStandpoint.parse(json);

    await prisma.standpoint.create({
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
