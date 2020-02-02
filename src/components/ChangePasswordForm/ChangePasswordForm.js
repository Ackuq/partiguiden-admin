import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { object } from 'prop-types';

const ChangePasswordForm = ({ firebase }) => {
  const [newPassword, setNewPassword] = useState('');
  const [verification, setVerification] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = event => {
    firebase
      .doPasswordUpdate(newPassword)
      .then(() => {
        setSuccess(true);
        setError(null);
      })
      .catch(err => setError(err));

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="newPassword"
        label="Nytt lösenord"
        type="password"
        value={newPassword}
        onChange={event => setNewPassword(event.target.value)}
        margin="normal"
      />

      <TextField
        style={{ marginBottom: '2rem' }}
        id="verification"
        label="Skriv lösenordet igen"
        type="password"
        value={verification}
        onChange={event => setVerification(event.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        disabled={verification !== newPassword || newPassword === ''}
        type="submit"
      >
        Byt lösenord
      </Button>
      {success && (
        <Typography variant="body1" color="primary">
          Lösenordet har ändrats
        </Typography>
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error.message}
        </Typography>
      )}
    </form>
  );
};

ChangePasswordForm.propTypes = {
  firebase: object.isRequired
};

export default ChangePasswordForm;
