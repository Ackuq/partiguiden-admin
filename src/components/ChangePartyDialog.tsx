import React, { useEffect } from 'react';
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
import { updateParty } from '../lib/ApiStore';
import snackbarRef from '../lib/snackbarRef';
import { Party } from '../types/parties';

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
  party?: Party;
}

const ChangePartyDialog: React.FC<Props> = ({ open, onClose, party, handleGetParties }) => {
  const form = useFormik({
    initialValues: {
      name: '',
      id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('A name is required'),
      id: Yup.string().required('An abbreviation is required'),
    }),
    onSubmit: (values) => {
      return updateParty(party?.id as string, values).then(() => {
        handleGetParties();
        snackbarRef.current?.updateSnack({ severity: 'success', text: 'Party updated' });
        form.resetForm();
        onClose();
      });
    },
    validateOnMount: true,
  });

  useEffect(() => {
    form.setFieldValue('name', party?.name || '');
    form.setFieldValue('id', party?.id || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [party]);

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Change party</DialogTitle>
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
          disabled
          variant="filled"
          margin="dense"
          id="id"
          label="Abbreviation"
          value={form.values.id}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.id && !!form.errors.id}
          helperText={form.touched.id && form.errors.id}
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePartyDialog;
