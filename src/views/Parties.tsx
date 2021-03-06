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

  const handleGetParties = () => {
    getParties().then((data) => {
      setParties(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetParties();
  }, []);

  const deleteCallback = (abbreviation: string) => {
    const confirm = window.confirm('Delete this party?');

    if (confirm) {
      deleteParty(abbreviation).then(() => {
        handleGetParties();
      });
    }
  };

  const toggleAddPartyModal = () => {
    setAddParty((prevState) => !prevState);
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
          <React.Fragment key={party.abbreviation}>
            <ListItem>
              <ListItemText primary={party.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteCallback(party.abbreviation)}
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
    </div>
  );
};

export default Parties;
