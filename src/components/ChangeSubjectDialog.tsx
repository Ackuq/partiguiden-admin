import React, { useEffect, useMemo } from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SubjectListEntry } from '../types/subjects';
import { updateSubject } from '../lib/ApiStore';
import snackbarRef from '../lib/snackbarRef';

const useStyles = makeStyles({
  formField: {
    marginBottom: 15,
  },
});

interface Props {
  open: boolean;
  onClose: () => void;
  subject: SubjectListEntry;
  subjects: Array<SubjectListEntry>;
  handleGetSubjects: () => void;
}

const ChangeSubjectDialog: React.FC<Props> = ({
  open,
  onClose,
  handleGetSubjects,
  subject,
  subjects,
}) => {
  const form = useFormik({
    initialValues: {
      name: '',
      related_subjects_ids: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      related_subjects_ids: Yup.array(),
    }),
    onSubmit: (values) => {
      return updateSubject(subject?.id as number, values).then(() => {
        handleGetSubjects();
        snackbarRef.current?.updateSnack({ severity: 'success', text: 'Subject updated' });
        onClose();
      });
    },
    validateOnMount: true,
  });

  useEffect(() => {
    form.setFieldValue('name', subject?.name || '');
    form.setFieldValue('related_subjects_ids', subject?.related_subjects || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);
  const classes = useStyles();

  const handleRelatedSubjectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: Array<number> = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value, 10));
      }
    }

    form.setFieldValue('related_subjects_ids', value);
  };

  const relatedAlternatives = useMemo(
    () => subjects.filter((subjectEntry) => subjectEntry.id !== subject.id),
    [subject, subjects]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Change subject</DialogTitle>
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
          {relatedAlternatives.map((subjectEntry) => (
            <option key={subjectEntry.id} value={subjectEntry.id}>
              {subjectEntry.name}
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeSubjectDialog;
