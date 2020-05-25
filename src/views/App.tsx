import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import * as ROUTES from '../lib/routes';
import theme from '../lib/theme';

import Layout from './Layout';
import SignIn from './SignIn';
import Subjects from './Subjects';
import HomePage from './HomePage';

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
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
