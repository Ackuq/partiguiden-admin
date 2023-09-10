import MainContainer from '@components/main-container';
import Table, { Column, Row } from '@components/table';
import AddSubjectModal from './add-subject-modal';
import SubjectActions from './subject-actions';
import { getSubjectsWithRelated } from './prisma';

export default async function Subjects() {
  const subjects = await getSubjectsWithRelated();

  return (
    <MainContainer>
      <AddSubjectModal subjects={subjects} />
      <Table
        columns={['Namn', 'Relaterade sakområden', 'Funktioner']}
        className="mt-4"
      >
        {subjects.map((subject) => (
          <Row key={subject.name}>
            <Column>{subject.name}</Column>
            <Column>
              {subject.relatedSubjects
                .map((subject) => subject.name)
                .join(', ')}
            </Column>
            <Column className="flex gap-4">
              <SubjectActions
                subjects={subjects.filter(
                  (related) => related.name !== subject.name
                )}
                subject={subject}
              />
            </Column>
          </Row>
        ))}
      </Table>
    </MainContainer>
  );
}
