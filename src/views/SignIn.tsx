import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

import { RouteComponentProps } from 'react-router-dom';

import * as ROUTES from '../lib/routes';
import { login } from '../lib/ApiStore';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  passwordButton: {
    alignSelf: 'flex-end',
    marginTop: '1rem',
  },
});

const SignInForm: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    login(values.username, values.password)
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch((err: any) => {
        console.log('ERROR');
        setError(Object.values(err)[0] as string);
      });
  };

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <img style={{ maxWidth: '100%' }} src="/static/images/partiguiden_logo.svg" alt="logo" />

      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          variant="filled"
          id="username"
          label="Username"
          value={values.username}
          onChange={handleChange('username')}
          margin="normal"
        />
        <TextField
          variant="filled"
          id="password"
          label="Lösenord"
          type="password"
          onChange={handleChange('password')}
          autoComplete="current-password"
          margin="normal"
          style={{ marginBottom: '2rem' }}
        />
        <Button
          variant="contained"
          disabled={values.password === '' || values.username === ''}
          type="submit"
        >
          Logga in
        </Button>

        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default SignInForm;
