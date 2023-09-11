import type { Party, Subject } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PARTIES: Party[] = [
  { abbreviation: 'S', name: 'Socialdemokraterna' },
  { abbreviation: 'M', name: 'Moderaterna' },
  { abbreviation: 'SD', name: 'Sverigedemokraterna' },
  { abbreviation: 'C', name: 'Centerpartiet' },
  { abbreviation: 'V', name: 'Vänsterpartiet' },
  { abbreviation: 'KD', name: 'Kristdemokraterna' },
  { abbreviation: 'L', name: 'Liberalerna' },
];

const SUBJECTS: Subject[] = [
  { name: 'Bostad' },
  { name: 'Demokrati' },
  { name: 'Ekonomi och Skatter' },
  { name: 'Energi' },
  { name: 'Europa' },
  { name: 'Familjen' },
  { name: 'Försvar' },
  { name: 'Infrastruktur och Trafik' },
  { name: 'IT och Mobiltelefoni' },
  { name: 'Jobb' },
  { name: 'Jordbruk, Jakt och Fiske' },
  { name: 'Jämställdhet och diskriminering' },
  { name: 'Konsumentpolitik' },
  { name: 'Kultur, media, och idrott' },
  { name: 'Lag och rätt' },
  { name: 'Landsbygd' },
  { name: 'Migration och Integration' },
  { name: 'Miljö och klimat' },
  { name: 'Näringsliv' },
  { name: 'Trygghetssystem och Välfärd' },
  { name: 'Utbildning' },
  { name: 'Utrikes- och biståndsfrågor' },
  { name: 'Vård och Omsorg' },
  { name: 'Äldrepolitik' },
];

const SUBJECT_RELATIONS: Record<string, string[]> = {
  Bostad: ['Energi', 'Trygghetssystem och Välfärd'],
  Demokrati: [
    'Lag och rätt',
    'Trygghetssystem och Välfärd',
    'Utrikes- och biståndsfrågor',
  ],
  'Ekonomi och Skatter': [
    'Energi',
    'Jobb',
    'Konsumentpolitik',
    'Lag och rätt',
    'Näringsliv',
    'Trygghetssystem och Välfärd',
  ],
  Energi: ['Bostad', 'Ekonomi och Skatter', 'Landsbygd'],
  Europa: ['Utrikes- och biståndsfrågor'],
  Familjen: ['Trygghetssystem och Välfärd', 'Utbildning'],
  Försvar: ['Lag och rätt', 'Utrikes- och biståndsfrågor'],
  'Infrastruktur och Trafik': [],
  'IT och Mobiltelefoni': [],
  Jobb: ['Ekonomi och Skatter', 'Näringsliv', 'Trygghetssystem och Välfärd'],
  'Jordbruk, Jakt och Fiske': ['Landsbygd', 'Miljö och klimat'],
  'Jämställdhet och diskriminering': ['Lag och rätt', 'Vård och Omsorg'],
  Konsumentpolitik: ['Ekonomi och Skatter', 'Kultur, media, och idrott'],
  'Kultur, media, och idrott': [
    'Konsumentpolitik',
    'Näringsliv',
    'Trygghetssystem och Välfärd',
  ],
  'Lag och rätt': [
    'Demokrati',
    'Ekonomi och Skatter',
    'Försvar',
    'Jämställdhet och diskriminering',
    'Trygghetssystem och Välfärd',
    'Utrikes- och biståndsfrågor',
  ],
  Landsbygd: ['Energi', 'Jordbruk, Jakt och Fiske', 'Miljö och klimat'],
  'Migration och Integration': ['Utbildning'],
  'Miljö och klimat': ['Jordbruk, Jakt och Fiske', 'Landsbygd'],
  Näringsliv: ['Ekonomi och Skatter', 'Jobb', 'Kultur, media, och idrott'],
  'Trygghetssystem och Välfärd': [
    'Bostad',
    'Demokrati',
    'Ekonomi och Skatter',
    'Familjen',
    'Jobb',
    'Kultur, media, och idrott',
    'Lag och rätt',
    'Vård och Omsorg',
    'Äldrepolitik',
  ],
  Utbildning: ['Familjen', 'Migration och Integration'],
  'Utrikes- och biståndsfrågor': [
    'Demokrati',
    'Europa',
    'Försvar',
    'Lag och rätt',
  ],
  'Vård och Omsorg': [
    'Jämställdhet och diskriminering',
    'Trygghetssystem och Välfärd',
    'Äldrepolitik',
  ],
  Äldrepolitik: ['Trygghetssystem och Välfärd', 'Vård och Omsorg'],
};

async function main() {
  // Create parties
  await prisma.party.createMany({
    data: PARTIES,
    skipDuplicates: true,
  });

  // Create subjects
  await prisma.subject.createMany({
    data: SUBJECTS,
    skipDuplicates: true,
  });
  // Connect subjects
  await prisma.$transaction(
    Object.entries(SUBJECT_RELATIONS).map(([subject, relatedSubjects]) =>
      prisma.subject.update({
        where: {
          name: subject,
        },
        data: {
          relatedSubjects: {
            connect: relatedSubjects.map((relatedSubject) => ({
              name: relatedSubject,
            })),
          },
        },
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
