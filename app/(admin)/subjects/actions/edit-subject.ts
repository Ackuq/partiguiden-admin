'use server';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zSubject } from '../subject-form';
import type { SubjectWithRelated } from '../prisma';

export default async function editSubject(
  subjectPrisma: SubjectWithRelated,
  formData: FormData
) {
  try {
    const json = Object.fromEntries(formData.entries());
    const data = zSubject.parse({
      ...json,
      relatedSubjects: formData.getAll('relatedSubjects'),
    });
    const oldRelated = subjectPrisma.relatedSubjects.map(({ name }) => name);
    const toAdd = data.relatedSubjects.filter(
      (name) => !oldRelated.includes(name)
    );
    const toRemove = oldRelated.filter(
      (name) => !data.relatedSubjects.includes(name)
    );

    await prisma.$transaction([
      prisma.subject.update({
        where: {
          name: subjectPrisma.name,
        },
        data: {
          name: data.name,
          relatedSubjects: {
            connect: toAdd.map((subject) => ({ name: subject })),
            disconnect: toRemove.map((subject) => ({ name: subject })),
          },
        },
      }),
      // Disconnect the removed related subjects
      ...toRemove.map((name) => {
        return prisma.subject.update({
          where: {
            name,
          },
          data: {
            relatedSubjects: {
              disconnect: { name: data.name },
            },
          },
        });
      }),
      // Connect new related subjects
      ...toAdd.map((name) => {
        return prisma.subject.update({
          where: {
            name,
          },
          data: {
            relatedSubjects: {
              connect: { name: data.name },
            },
          },
        });
      }),
    ]);
    revalidatePath(PAGES.subjects.href);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { zodIssues: error.errors };
    }
    return { message: 'Något gick snett med denna förfrågan' };
  }
}
