import MainContainer from '@components/main-container';
import prisma from '@lib/prisma';
import AddPartyModal from './add-party-modal';
import Table, { Column, Row } from '@components/table';

export default async function Parties() {
  const parties = await prisma.party.findMany();

  return (
    <MainContainer>
      <AddPartyModal />
      <Table columns={['Partinamn', 'Partiförkortning']} className="mt-4">
        {parties.map((party) => (
          <Row key={party.abbreviation}>
            <Column>{party.name}</Column>
            <Column>{party.abbreviation}</Column>
          </Row>
        ))}
      </Table>
    </MainContainer>
  );
}
