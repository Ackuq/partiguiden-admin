'use server';

import handleServerError from '@lib/handleServerError';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import getPartyData from '@lib/scrapers/get-party-data';
import { revalidatePath } from 'next/cache';

export async function fetchPartyStandpoints(abbreviation: string) {
  try {
    const data = await getPartyData(abbreviation);
    const now = new Date();
    await prisma.$transaction(
      data.map((entry) =>
        prisma.standpoint.upsert({
          where: {
            link: entry.url,
          },
          update: {
            title: entry.title,
            content: entry.opinions,
            fetchDate: now,
          },
          create: {
            title: entry.title,
            fetchDate: now,
            content: entry.opinions,
            link: entry.url,
            partyAbbreviation: abbreviation,
          },
        })
      )
    );
    revalidatePath(PAGES.standpoints.href);
  } catch (error) {
    return handleServerError(error);
  }
}
