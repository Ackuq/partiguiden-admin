import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ChangePasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [verification, setVerification] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = () => {};

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="newPassword"
        label="Nytt lösenord"
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        margin="normal"
      />

      <TextField
        style={{ marginBottom: '2rem' }}
        id="verification"
        label="Skriv lösenordet igen"
        type="password"
        value={verification}
        onChange={(event) => setVerification(event.target.value)}
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
          {error}
        </Typography>
      )}
    </form>
  );
};

export default ChangePasswordForm;
