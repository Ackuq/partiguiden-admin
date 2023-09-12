-- CreateTable
CREATE TABLE "Party" (
    "abbreviation" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "Subject" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Standpoint" (
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT[],
    "update_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partyAbbreviation" TEXT NOT NULL,
    "subjectName" TEXT,

    CONSTRAINT "Standpoint_pkey" PRIMARY KEY ("link")
);

-- CreateTable
CREATE TABLE "_SubjectRelatedSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectRelatedSubjects_AB_unique" ON "_SubjectRelatedSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectRelatedSubjects_B_index" ON "_SubjectRelatedSubjects"("B");

-- AddForeignKey
ALTER TABLE "Standpoint" ADD CONSTRAINT "Standpoint_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standpoint" ADD CONSTRAINT "Standpoint_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "Subject"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectRelatedSubjects" ADD CONSTRAINT "_SubjectRelatedSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectRelatedSubjects" ADD CONSTRAINT "_SubjectRelatedSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("name") ON DELETE CASCADE ON UPDATE CASCADE;
