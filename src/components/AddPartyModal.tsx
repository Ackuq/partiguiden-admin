import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  makeStyles,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  handleGetParties: () => void;
}

const AddPartyDialog: React.FC<Props> = ({ open, onClose, handleGetParties }) => {
  const form = useFormik({
    initialValues: {
      name: '',
      abbreviation: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('A name is required'),
      abbreviation: Yup.string().required('An abbreviation is required'),
    }),
    onSubmit: (values) => {
      return createParty(values).then(() => {
        handleGetParties();
        onClose();
      });
    },
    validateOnMount: true,
  });

  const classes = useStyles();

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
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.name && !!form.errors.name}
          helperText={form.touched.name && form.errors.name}
          classes={{ root: classes.formField }}
        />
        <TextField
          fullWidth
          variant="filled"
          margin="dense"
          id="abbreviation"
          label="Abbreviation"
          value={form.values.abbreviation}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.abbreviation && !!form.errors.abbreviation}
          helperText={form.touched.abbreviation && form.errors.abbreviation}
          classes={{ root: classes.formField }}
          InputProps={{ classes: { root: classes.squareCorners } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={form.submitForm}
          disabled={form.isSubmitting || !form.isValid}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPartyDialog;
