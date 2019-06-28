import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { object } from 'prop-types';

const NewPasswordModal = ({ firebase }) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = event => {
    firebase
      .doPasswordReset(email)
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
        id="email"
        label="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        margin="normal"
        style={{ marginBottom: '2rem' }}
      />
      <Button variant="contained" disabled={email === ''} type="submit">
        Skicka återställningslänk
      </Button>
      {success && (
        <Typography variant="body1" color="primary">
          En återställningslänk är skickad
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

NewPasswordModal.propTypes = {
  firebase: object.isRequired
};

export default NewPasswordModal;
