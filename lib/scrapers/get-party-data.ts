import { parseArgs } from 'node:util';
import * as fs from 'node:fs';
import scrapers from './scrapers';

async function getPartyData(
  abbreviation: string,
  limit?: number,
  preview?: boolean
) {
  if (!Object.keys(scrapers).includes(abbreviation.toLowerCase())) {
    throw new Error(`No scraper created for party ${abbreviation}`);
  }

  const scraper =
    scrapers[abbreviation.toLocaleLowerCase() as keyof typeof scrapers];

  const data = await scraper.getPages(limit);

  if (preview) {
    console.log(`Number of entries: ${data.length}`);
    console.log(
      `Number of entries without content: ${
        data.filter((entry) => entry.opinions.length === 0).length
      }`
    );
    if (!fs.existsSync('.scraper_out')) {
      fs.mkdirSync('.scraper_out');
    }
    fs.writeFileSync(
      `.scraper_out/${abbreviation.toLowerCase()}.json`,
      JSON.stringify(data, null, 2)
    );
  }
  return data;
}

if (require.main === module) {
  const {
    values: { limit, party },
  } = parseArgs({
    options: {
      party: {
        type: 'string',
        short: 'p',
      },
      limit: {
        type: 'string',
        short: 'l',
      },
    },
  });

  if (!party) {
    throw new Error('Party is not set');
  }

  if (party === 'all') {
    Object.keys(scrapers).forEach((abbreviation) => {
      getPartyData(abbreviation, limit ? parseInt(limit) : undefined, true);
    });
  } else {
    getPartyData(party, limit ? parseInt(limit) : undefined, true);
  }
}
