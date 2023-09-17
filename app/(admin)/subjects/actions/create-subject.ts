'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { zSubject } from '../subject-form';
import handleServerError from '@lib/handleServerError';

export default async function createSubject(formData: FormData) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zSubject.parse({
      ...json,
      relatedSubjects: formData.getAll('relatedSubjects'),
    });

    await prisma.$transaction([
      prisma.subject.create({
        data: {
          name: data.name,
          relatedSubjects: {
            connect: data.relatedSubjects.map((subject) => ({ name: subject })),
          },
        },
      }),
      // Also update the related subjects to point to this new subject
      ...data.relatedSubjects.map((name) => {
        return prisma.subject.update({
          where: {
            name,
          },
          data: {
            relatedSubjects: {
              connect: {
                name: data.name,
              },
            },
          },
        });
      }),
    ]);

    revalidatePath(PAGES.subjects.href);
  } catch (error) {
    return handleServerError(error);
  }
}
