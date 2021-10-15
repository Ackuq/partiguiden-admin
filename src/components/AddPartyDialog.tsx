import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { css } from '@emotion/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createParty } from '../lib/ApiStore';
import snackbarRef from '../lib/snackbarRef';

const formFieldCSS = css`
  margin-bottom: 0px;
  margin-top: 0px;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  handleGetParties: () => void;
}

const AddPartyDialog: React.FC<Props> = ({ open, onClose, handleGetParties }) => {
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
      return createParty(values).then(() => {
        handleGetParties();
        snackbarRef.current?.updateSnack({ severity: 'success', text: 'Party created' });
        form.resetForm();
        onClose();
      });
    },
    validateOnMount: true,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add party</DialogTitle>
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
          css={formFieldCSS}
        />
        <TextField
          fullWidth
          variant="filled"
          margin="dense"
          id="id"
          label="Abbreviation"
          value={form.values.id}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.id && !!form.errors.id}
          helperText={form.touched.id && form.errors.id}
          css={formFieldCSS}
          InputProps={{ sx: { borderRadius: 0 } }}
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
