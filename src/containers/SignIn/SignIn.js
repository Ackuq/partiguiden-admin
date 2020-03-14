import React, { useState } from 'react';
import { object } from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import makeStyles from '@material-ui/styles/makeStyles';

import * as ROUTES from '../../lib/routes';
import ApiStore from '../../lib/ApiStore';
import styles from './styles';

const useStyles = makeStyles(styles);

const SignInForm = ({ history }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const onSubmit = event => {
    ApiStore.login(values.username, values.password)
      .then(() => history.push(ROUTES.HOME))
      .catch(err => {
        setError(Object.values(err)[0]);
      });

    event.preventDefault();
  };
  const handleModal = () => setShowModal(prevState => !prevState);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <img style={{ maxWidth: '100%' }} src="/static/images/partiguiden_logo.svg" alt="logo" />

      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          id="username"
          label="Username"
          value={values.username}
          onChange={handleChange('username')}
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
      <Button classes={{ root: classes.passwordButton }} onClick={handleModal}>
        Glömt lösenord
      </Button>
      <Dialog open={showModal} onBackdropClick={handleModal} fullWidth>
        <DialogTitle>Glömt lösenord</DialogTitle>
        <DialogContent>
          <DialogContentText>Fyll i mailaddressen till ditt konto nedan</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Stäng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

SignInForm.propTypes = {
  history: object.isRequired,
};

export default SignInForm;
