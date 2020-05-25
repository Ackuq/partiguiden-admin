import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  makeStyles,
  DialogActions,
  Button,
  InputLabel,
} from '@material-ui/core';
import { Subject } from '../types/subjects.d';
import { createSubject } from '../lib/ApiStore';

const useStyles = makeStyles({
  formField: {
    marginBottom: 15,
  },
});

interface Props {
  open: boolean;
  onClose: () => void;
  subjects: Array<Subject>;
  appendSubject: (newSubject: Subject) => void;
}

interface Form {
  name: string;
  related_subject: Array<number>;
}

const AddSubjectDialog: React.FC<Props> = ({ open, onClose, appendSubject, subjects }) => {
  const [form, setForm] = useState<Form>({ name: '', related_subject: [] });

  const classes = useStyles();

  const handleRelatedSubjectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: Array<number> = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value, 10));
      }
    }
    setForm((prevState) => ({ ...prevState, related_subject: value }));
  };

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.persist();
    setForm((prevState) => ({ ...prevState, name: event.target.value as string }));
  };

  const handleSubmit = () => {
    createSubject(form).then((newSubject: Subject) => {
      appendSubject(newSubject);
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
          onChange={handleNameChange}
          classes={{ root: classes.formField }}
        />
        <InputLabel shrink htmlFor="select-multiple-native">
          Related subjects
        </InputLabel>
        <Select
          fullWidth
          multiple
          native
          value={form.related_subject}
          placeholder="Related subjects"
          onChange={handleRelatedSubjectChange}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Select>
        <Button onClick={() => setForm((prevState) => ({ ...prevState, related_subject: [] }))}>
          Deselect all
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!form.name} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubjectDialog;
