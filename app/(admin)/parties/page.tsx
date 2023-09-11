'use server';
import MainContainer from '@components/main-container';
import prisma from '@lib/prisma';
import AddPartyModal from './add-party-modal';
import Table, { Column, Row } from '@components/table';
import PartyActions from './party-actions';

export default async function Parties() {
  const parties = await prisma.party.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <MainContainer>
      <AddPartyModal />
      <Table
        columns={[
          { name: 'Partinamn', width: '50%' },
          { name: 'Partiförkortning', width: '20%' },
          { name: 'Funktioner', width: '30%' },
        ]}
        className="mt-4"
      >
        {parties.map((party) => (
          <Row key={party.abbreviation}>
            <Column>{party.name}</Column>
            <Column>{party.abbreviation}</Column>
            <Column className="flex gap-4">
              <PartyActions party={party} />
            </Column>
          </Row>
        ))}
      </Table>
    </MainContainer>
  );
}
