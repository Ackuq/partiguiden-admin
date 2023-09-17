-- DropForeignKey
ALTER TABLE "Standpoint" DROP CONSTRAINT "Standpoint_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Standpoint" DROP CONSTRAINT "Standpoint_subjectName_fkey";

-- AddForeignKey
ALTER TABLE "Standpoint" ADD CONSTRAINT "Standpoint_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standpoint" ADD CONSTRAINT "Standpoint_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "Subject"("name") ON DELETE NO ACTION ON UPDATE CASCADE;
