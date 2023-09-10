'use server';

import prisma from '@lib/prisma';
import { Prisma } from '@prisma/client';

export async function getSubjectsWithRelated() {
  const subjectsWithRelated = await prisma.subject.findMany({
    include: {
      relatedSubjects: true,
    },
  });
  return subjectsWithRelated;
}

export type SubjectWithRelated = Prisma.PromiseReturnType<
  typeof getSubjectsWithRelated
>[number];
