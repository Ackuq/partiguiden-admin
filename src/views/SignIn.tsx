import React from 'react';

import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as ROUTES from '../lib/routes';
import { login } from '../lib/ApiStore';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
`;

const LoginContainer = styled(Container)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignInForm: React.FC = () => {
  const navigate = useNavigate();

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
          navigate(ROUTES.SUBJECTS);
        })
        .catch((err) => {
          if (err.detail) {
            form.setFieldValue('error', err.detail);
          }
        });
    },
  });

  return (
    <LoginContainer maxWidth="sm">
      <img style={{ maxWidth: '100%' }} src="/static/images/partiguiden_logo.svg" alt="logo" />

      <Form onSubmit={form.handleSubmit}>
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
      </Form>
    </LoginContainer>
  );
};

export default SignInForm;
