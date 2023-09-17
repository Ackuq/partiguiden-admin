'use server';

import handleServerError from '@lib/handleServerError';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import getPartyData from '@lib/scrapers/get-party-data';
import { revalidatePath } from 'next/cache';

export async function fetchPartyStandpoints(abbreviation: string) {
  const data = await getPartyData(abbreviation);

  const now = new Date();

  try {
    await prisma.standpoint.createMany({
      data: data.map((entry) => ({
        title: entry.title,
        fetchDate: now,
        content: entry.opinions,
        link: entry.url,
        partyAbbreviation: abbreviation,
      })),
      skipDuplicates: true,
    });
    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    return handleServerError(error);
  }
}
