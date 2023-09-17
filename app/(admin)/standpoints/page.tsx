import MainContainer from '@components/main-container';
import Table, { Column, Row } from '@components/table';
import AddStandpointModal from './add-standpoint-modal';
import StandpointActions from './standpoint-actions';
import { getPageData } from './prisma';
import SubjectDropdown from './subject-dropdown';
import CategorizedFilterCheck from './categorized-filter-check';
import { Fragment } from 'react';

interface StandpointsProps {
  searchParams: Record<string, string>;
}

export default async function Standpoints({ searchParams }: StandpointsProps) {
  const [standpoints, parties, subjects] = await getPageData(
    searchParams['hide-categorized'] === 'true'
  );

  const standpointsGroupedByParty = standpoints.reduce(
    (prev, current) => ({
      ...prev,
      [current.partyAbbreviation]: [
        ...(prev[current.partyAbbreviation] ?? []),
        current,
      ],
    }),
    {} as { [party: string]: typeof standpoints }
  );

  return (
    <MainContainer>
      <AddStandpointModal parties={parties} subjects={subjects} />
      <CategorizedFilterCheck />
      <Table
        columns={[
          { name: 'Titel', width: '20%' },
          { name: 'Parti', width: '10%' },
          { name: 'Sakområde', width: '20%' },
          { name: 'Funktioner', width: '20%' },
        ]}
        className="mt-4"
      >
        {Object.entries(standpointsGroupedByParty).map(
          ([partyAbbreviation, standpoints]) => (
            <Fragment key={partyAbbreviation}>
              <Row>
                <Column colSpan={4} className="text-center text-lg font-bold">
                  {
                    parties.find(
                      (party) => party.abbreviation === partyAbbreviation
                    )?.name
                  }
                </Column>
              </Row>
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
                  <Column>
                    <SubjectDropdown
                      standpoint={standpoint}
                      subjects={subjects}
                    />
                  </Column>
                  <Column className="flex gap-4">
                    <StandpointActions
                      standpoint={standpoint}
                      subjects={subjects}
                      parties={parties}
                    />
                  </Column>
                </Row>
              ))}
            </Fragment>
          )
        )}
      </Table>
    </MainContainer>
  );
}
