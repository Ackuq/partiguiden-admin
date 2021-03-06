import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import * as ROUTES from '../lib/routes';
import theme from '../lib/theme';

import Snackbar from '../components/Snackbar';

import Layout from './Layout';
import SignIn from './SignIn';
import Subjects from './Subjects';
import HomePage from './HomePage';
import Parties from './Parties';
import Standpoints from './Standpoints';
import { snackbarRef } from '../lib/snackbarRef';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          <Layout>
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.SUBJECTS} component={Subjects} />
            <Route exact path={ROUTES.PARTIES} component={Parties} />
            <Route exact path={ROUTES.STANDPOINTS} component={Standpoints} />
          </Layout>
        </Switch>
      </Router>
      <Snackbar ref={snackbarRef} />
    </ThemeProvider>
  );
};

export default App;
