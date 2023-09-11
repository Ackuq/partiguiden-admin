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
        columns={[
          { name: 'Titel', width: '20%' },
          { name: 'Parti', width: '10%' },
          { name: 'Sakområde', width: '20%' },
          { name: 'Funktioner', width: '20%' },
        ]}
        className="mt-4"
      >
        {standpoints.map((standpoint) => (
          <Row key={standpoint.link}>
            <Column>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={standpoint.link}
              >
                {standpoint.title}
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
