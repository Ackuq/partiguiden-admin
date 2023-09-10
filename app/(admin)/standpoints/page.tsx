import MainContainer from '@components/main-container';
import Table, { Column, Row } from '@components/table';
import AddStandpointModal from './add-standpoint-modal';
import StandpointActions from './standpoint-actions';
import { getPageData } from './prisma';

export default async function Standpoints() {
  const [standpoints, parties, subjects] = await getPageData();

  return (
    <MainContainer>
      <AddStandpointModal parties={parties} subjects={subjects} />
      <Table
        columns={['Titel', 'Länk', 'Parti', 'Sakområde', 'Funktioner']}
        className="mt-4"
      >
        {standpoints.map((standpoint) => (
          <Row key={standpoint.link}>
            <Column>{standpoint.title}</Column>
            <Column>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={standpoint.link}
              >
                {standpoint.link}
              </a>
            </Column>
            <Column>{standpoint.partyAbbreviation}</Column>
            <Column>{standpoint.subjectName}</Column>
            <Column className="flex gap-4">
              <StandpointActions
                standpoint={standpoint}
                subjects={subjects}
                parties={parties}
              />
            </Column>
          </Row>
        ))}
      </Table>
    </MainContainer>
  );
}
