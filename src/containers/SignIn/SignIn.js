import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FirebaseContext } from '../../lib/Firebase';
import * as ROUTES from '../../lib/routes';
import styles from './styles';

const useStyles = makeStyles(styles);

const SignInForm = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const classes = useStyles();
  const [error, setError] = useState(null);
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError(err);
      });

    event.preventDefault();
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          id="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          onChange={handleChange('password')}
          autoComplete="current-password"
          margin="normal"
        />
        <Button
          variant="contained"
          disabled={values.password === '' || values.email === ''}
          type="submit"
        >
          Sign In
        </Button>

        {error && <Typography variant="body1">{error.message}</Typography>}
      </form>
    </Container>
  );
};

SignInForm.propTypes = {
  history: object.isRequired
};

export default withRouter(SignInForm);
