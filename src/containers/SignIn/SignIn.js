import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  Typography,
  TextField,
  Button,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import NewPasswordForm from './components/NewPasswordForm';
import { FirebaseContext } from '../../lib/Firebase';
import * as ROUTES from '../../lib/routes';
import styles from './styles';

const useStyles = makeStyles(styles);

const SignInForm = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => history.push(ROUTES.HOME))
      .catch(err => setError(err));

    event.preventDefault();
  };

  const handleModal = () => setShowModal(prevState => !prevState);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <img style={{ maxWidth: '100%' }} src="./images/partiguiden_logo.svg" alt="logo" />

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
          label="Lösenord"
          type="password"
          onChange={handleChange('password')}
          autoComplete="current-password"
          margin="normal"
          style={{ marginBottom: '2rem' }}
        />
        <Button
          variant="contained"
          disabled={values.password === '' || values.email === ''}
          type="submit"
        >
          Logga in
        </Button>

        {error && (
          <Typography variant="body1" color="error">
            {error.message}
          </Typography>
        )}
      </form>
      <Button classes={{ root: classes.passwordButton }} onClick={handleModal}>
        Glömt lösenord
      </Button>
      <Dialog open={showModal} onBackdropClick={handleModal} fullWidth>
        <DialogTitle>Glömt lösenord</DialogTitle>
        <DialogContent>
          <DialogContentText>Fyll i mailaddressen till ditt konto nedan</DialogContentText>
          <NewPasswordForm firebase={firebase} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Stäng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

SignInForm.propTypes = {
  history: object.isRequired
};

export default withRouter(SignInForm);
