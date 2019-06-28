import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import * as ROUTES from '../../lib/routes';
import { useAuthentication, AuthUserContext } from '../../lib/Sessions';
import theme from '../../lib/theme';

import Layout from '../Layout';
import SignIn from '../SignIn';
import Subjects from '../Subjects';
import HomePage from '../HomePage';

const App = () => {
  return (
    <AuthUserContext.Provider value={useAuthentication()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
            {/* These routes require authentication */}
            <Layout>
              <Route exact path={ROUTES.HOME} component={HomePage} />
              <Route exact path={ROUTES.SUBJECTS} component={Subjects} />
            </Layout>
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthUserContext.Provider>
  );
};

export default App;
