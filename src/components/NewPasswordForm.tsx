import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const NewPasswordModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = () => {};

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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
          {error}
        </Typography>
      )}
    </form>
  );
};

export default NewPasswordModal;
