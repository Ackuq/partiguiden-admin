'use server';

import handleServerError from '@lib/handleServerError';
import { PAGES } from '@lib/navigation';
import prisma from '@lib/prisma';
import type { GetPartyData } from '@lib/scrapers/get-party-data';
import getPartyData from '@lib/scrapers/get-party-data';
import { revalidatePath } from 'next/cache';

export async function fetchPartyStandpoints(options: GetPartyData) {
  try {
    const data = await getPartyData(options);
    const now = new Date();
    await prisma.$transaction(
      data.result.map((entry) =>
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
            partyAbbreviation: options.abbreviation,
          },
        })
      )
    );
    revalidatePath(PAGES.standpoints.href);
    return { hasMore: data.hasMore };
  } catch (error) {
    return handleServerError(error);
  }
}
