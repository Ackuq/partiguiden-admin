'use server';
import handleServerError from '@lib/handleServerError';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function deleteStandpoint(link: string) {
  try {
    await prisma.standpoint.delete({
      where: {
        link,
      },
    });
    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    return handleServerError(error);
  }
}
