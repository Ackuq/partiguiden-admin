import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { getParties, deleteParty } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

import { Party } from '../types/parties.d';
import AddPartyDialog from '../components/AddPartyModal';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Parties: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [parties, setParties] = useState<Array<Party>>([]);
  const [addParty, setAddParty] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    getParties().then((data) => {
      setParties(data);
      setLoading(false);
    });
  }, []);

  const deleteCallback = (id: number) => {
    const confirm = window.confirm('Delete this party?');

    if (confirm) {
      deleteParty(id).then(() => {
        setParties((prevState) => prevState.filter((party) => party.id !== id));
      });
    }
  };

  const toggleAddPartyModal = () => {
    setAddParty((prevState) => !prevState);
  };

  const appendParty = (newParty: Party) => {
    setParties((prevState) => prevState.concat(newParty));
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
      <List classes={{ root: classes.list }}>
        {parties.map((party, index) => (
          <React.Fragment key={party.id}>
            <ListItem>
              <ListItemText primary={party.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteCallback(party.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index !== parties.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <AddPartyDialog appendParty={appendParty} open={addParty} onClose={toggleAddPartyModal} />
    </div>
  );
};

export default Parties;
