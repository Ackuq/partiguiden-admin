'use server';

import prisma from '@lib/prisma';
import type { Prisma } from '@prisma/client';

export async function getPageData() {
  return prisma.$transaction([
    prisma.standpoint.findMany({
      orderBy: {
        title: 'asc',
      },
    }),
    prisma.party.findMany({
      select: { abbreviation: true, name: true },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.subject.findMany({
      select: { name: true },
      orderBy: {
        name: 'asc',
      },
    }),
  ]);
}

export type PartyWithAbbreviationAndName = Prisma.PromiseReturnType<
  typeof getPageData
>[1][number];

export type SubjectWithName = Prisma.PromiseReturnType<
  typeof getPageData
>[2][number];
