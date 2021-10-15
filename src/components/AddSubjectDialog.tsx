import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  DialogActions,
  Button,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { css } from '@emotion/react';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { SubjectListEntry } from '../types/subjects';
import { createSubject } from '../lib/ApiStore';
import snackbarRef from '../lib/snackbarRef';

const formFieldCSS = css`
  margin-bottom: 15px;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  subjects: Array<SubjectListEntry>;
  handleGetSubjects: () => void;
}

const AddSubjectDialog: React.FC<Props> = ({ open, onClose, handleGetSubjects, subjects }) => {
  const form = useFormik({
    initialValues: {
      name: '',
      related_subjects_ids: [] as number[],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      related_subjects_ids: Yup.array(),
    }),
    onSubmit: (values) => {
      return createSubject(values).then(() => {
        handleGetSubjects();
        snackbarRef.current?.updateSnack({ severity: 'success', text: 'Subject created' });
        form.resetForm();
        onClose();
      });
    },
    validateOnMount: true,
  });

  const handleRelatedSubjectChange = (event: SelectChangeEvent<number[]>) => {
    const { options } = event.target as unknown as HTMLSelectElement;
    const value: Array<number> = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value, 10));
      }
    }

    form.setFieldValue('related_subjects_ids', value);
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
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.name && !!form.errors.name}
          helperText={form.touched.name && form.errors.name}
          css={formFieldCSS}
        />
        <InputLabel shrink htmlFor="select-multiple-native">
          Related subjects
        </InputLabel>
        <Select
          fullWidth
          multiple
          native
          value={form.values.related_subjects_ids}
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
        <Button onClick={() => form.setFieldValue('related_subjects_ids', [])}>Deselect all</Button>
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

export default AddSubjectDialog;
