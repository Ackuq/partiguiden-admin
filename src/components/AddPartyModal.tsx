import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  makeStyles,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Party } from '../types/parties.d';
import { createParty } from '../lib/ApiStore';

const useStyles = makeStyles({
  formField: {
    marginBottom: 0,
    marginTop: 0,
  },
  squareCorners: {
    borderRadius: 0,
  },
});

interface Props {
  open: boolean;
  onClose: () => void;
  appendParty: (newParty: Party) => void;
}

const AddPartyDialog: React.FC<Props> = ({ open, onClose, appendParty }) => {
  const [form, setForm] = useState({ name: '', abbreviation: '' });

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; id: string }>) => {
    event.persist();
    setForm((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value as string,
    }));
  };

  const handleSubmit = () => {
    createParty(form).then((newSubject: Party) => {
      appendParty(newSubject);
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add subject</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          variant="filled"
          margin="dense"
          id="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          classes={{ root: classes.formField }}
        />
        <TextField
          fullWidth
          variant="filled"
          margin="dense"
          id="abbreviation"
          label="Abbreviation"
          value={form.abbreviation}
          onChange={handleChange}
          classes={{ root: classes.formField }}
          InputProps={{ classes: { root: classes.squareCorners } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!form.name && !form.abbreviation} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPartyDialog;
