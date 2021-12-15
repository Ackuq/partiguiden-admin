import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import * as ROUTES from '../lib/routes';
import theme from '../lib/theme';

import Snackbar from '../components/Snackbar';

import Layout from './Layout';
import SignIn from './SignIn';
import Subjects from './Subjects';
import Parties from './Parties';
import Standpoints from './Standpoints';
import snackbarRef from '../lib/snackbarRef';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route element={<Layout />}>
            <Route path={ROUTES.SUBJECTS} element={<Subjects />} />
            <Route path={ROUTES.PARTIES} element={<Parties />} />
            <Route path={ROUTES.STANDPOINTS} element={<Standpoints />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Snackbar ref={snackbarRef} />
    </ThemeProvider>
  );
};

export default App;
