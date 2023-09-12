'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function deleteSubject(name: string) {
  try {
    await prisma.subject.delete({
      where: {
        name,
      },
    });
    revalidatePath(PAGES.subjects.href);
  } catch (error) {
    return { message: 'Något gick snett med denna förfrågan' };
  }
}
