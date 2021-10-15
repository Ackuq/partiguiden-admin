import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';

import { getParties, deleteParty, updatePartyStandpoints } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

import { Party } from '../types/parties.d';
import AddPartyDialog from '../components/AddPartyDialog';
import snackbarRef from '../lib/snackbarRef';
import ChangePartyDialog from '../components/ChangePartyDialog';

const Parties: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [parties, setParties] = useState<Array<Party>>([]);
  const [addParty, setAddParty] = useState(false);
  const [changeParty, setChangeParty] = useState<Party>();

  const handleGetParties = () => {
    getParties().then((data) => {
      setParties(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetParties();
  }, []);

  const deleteCallback = (id: string) => {
    const confirm = window.confirm('Delete this party?');

    if (confirm) {
      deleteParty(id).then(() => {
        handleGetParties();
      });
    }
  };

  const updateStandpoints = (id: string) => {
    const confirm = window.confirm('Update standpoints for this party?');

    if (confirm) {
      updatePartyStandpoints(id).then(() => {
        snackbarRef.current?.updateSnack({
          severity: 'success',
          text: 'Successfully updated standpoints',
        });
      });
    }
  };

  const toggleAddPartyModal = () => {
    setAddParty((prevState) => !prevState);
  };

  const changePartyOpen = (party: Party) => {
    setChangeParty(party);
  };

  const changePartyClose = () => {
    setChangeParty(undefined);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        color="secondary"
        style={{ marginBottom: 10 }}
        onClick={toggleAddPartyModal}
      >
        Add party
      </Button>
      <List sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
        {parties.map((party, index) => (
          <React.Fragment key={party.id}>
            <ListItem>
              <ListItemText primary={party.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label={`change-${party.name}`}
                  onClick={() => changePartyOpen(party)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label={`update-${party.name}`}
                  onClick={() => updateStandpoints(party.id)}
                >
                  <UpdateIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label={`delete-${party.name}`}
                  onClick={() => deleteCallback(party.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index !== parties.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <AddPartyDialog
        handleGetParties={handleGetParties}
        open={addParty}
        onClose={toggleAddPartyModal}
      />
      <ChangePartyDialog
        handleGetParties={handleGetParties}
        open={!!changeParty}
        onClose={changePartyClose}
        party={changeParty}
      />
    </div>
  );
};

export default Parties;
