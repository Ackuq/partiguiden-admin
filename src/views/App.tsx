import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      <Router>
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Layout>
            <Route path={ROUTES.SUBJECTS} element={<Subjects />} />
            <Route path={ROUTES.PARTIES} element={<Parties />} />
            <Route path={ROUTES.STANDPOINTS} element={<Standpoints />} />
          </Layout>
        </Routes>
      </Router>
      <Snackbar ref={snackbarRef} />
    </ThemeProvider>
  );
};

export default App;
