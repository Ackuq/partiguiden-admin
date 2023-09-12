'use server';

import prisma from '@lib/prisma';
import type { Prisma } from '@prisma/client';

export async function getSubjectsWithRelated() {
  return prisma.subject.findMany({
    include: {
      relatedSubjects: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export type SubjectWithRelated = Prisma.PromiseReturnType<
  typeof getSubjectsWithRelated
>[number];
