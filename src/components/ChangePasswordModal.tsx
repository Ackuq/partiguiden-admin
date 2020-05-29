import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

interface Props {
  open: boolean;
  onClose: () => void;
}

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const passwordText =
  'Password needs to be 8 digits long and must include atleast one lowercase and uppercase letter and numeric value';
const verificationText = 'Passwords must match';

const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    password: '',
    verification: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown; id: string }>) => {
    event.persist();
    setForm((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value as string,
    }));
  };

  const onSubmit = () => {};

  const isValid = passwordPattern.test(form.password);
  const isSame = form.password === form.verification;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="password"
          label="Enter new password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={form.password !== '' && !isValid}
          helperText={form.password !== '' && !isValid && passwordText}
        />

        <TextField
          fullWidth
          id="verification"
          label="Enter password again"
          type="password"
          value={form.verification}
          onChange={handleChange}
          error={form.verification !== '' && !isSame}
          helperText={form.verification !== '' && !isSame && verificationText}
          style={{ marginTop: 20 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isValid && isSame} color="primary">
          Change password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
