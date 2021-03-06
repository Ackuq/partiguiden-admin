import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

import { useFormik } from 'formik';
import * as Yup from 'yup';

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

  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
      error: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    validateOnMount: true,
    onSubmit: (values) => {
      return login(values.username, values.password)
        .then(() => {
          history.push(ROUTES.HOME);
        })
        .catch((err) => {
          if (err.detail) {
            form.setFieldValue('error', err.detail);
          }
        });
    },
  });

  return (
    <Container className={classes.container} maxWidth="sm">
      <img style={{ maxWidth: '100%' }} src="/static/images/partiguiden_logo.svg" alt="logo" />

      <form onSubmit={form.handleSubmit} className={classes.form}>
        <TextField
          variant="filled"
          id="username"
          label="Username"
          value={form.values.username}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.username && !!form.errors.username}
          helperText={form.touched.username && form.errors.username}
          margin="normal"
        />
        <TextField
          variant="filled"
          id="password"
          label="Password"
          type="password"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.password && !!form.errors.password}
          helperText={form.touched.password && form.errors.password}
          autoComplete="current-password"
          margin="normal"
          style={{ marginBottom: '2rem' }}
        />
        <Button variant="contained" disabled={form.isSubmitting || !form.isValid} type="submit">
          Logga in
        </Button>

        {form.values.error && (
          <Typography variant="body1" color="error">
            {form.values.error}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default SignInForm;
