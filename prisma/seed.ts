import { PrismaClient } from '@prisma/client';
import PARTIES from './seed-data/parties.json';
import SUBJECTS from './seed-data/subjects.json';
import SUBJECT_RELATIONS from './seed-data/subject-relations.json';
import STANDPOINTS from './seed-data/standpoints.json';

const prisma = new PrismaClient();

async function main() {
  // Create parties
  console.log(`Seeding ${PARTIES.length} parties...`);
  await prisma.party.createMany({
    data: PARTIES,
    skipDuplicates: true,
  });

  // Create subjects
  console.log(`Seeding ${SUBJECTS.length} subjects...`);
  await prisma.subject.createMany({
    data: SUBJECTS,
    skipDuplicates: true,
  });

  // Connect subjects
  console.log(`Connecting subjects...`);
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

  // Seed standpoints
  console.log(`Seeding ${STANDPOINTS.length} standpoints...`);
  await prisma.standpoint.createMany({
    data: STANDPOINTS,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log('Finished seeding database!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
