import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { func, node, oneOfType } from 'prop-types';

import * as ROUTES from '../../lib/routes';
import { withAuthentication } from '../../lib/Sessions';

import Layout from '../Layout';
import SignIn from '../SignIn';
import HomePage from '../HomePage';

const AppLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

AppLayoutRoute.propTypes = {
  component: oneOfType([func, node]).isRequired
};

const App = () => (
  <Router>
    <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
    <AppLayoutRoute path={ROUTES.HOME} component={HomePage} />
  </Router>
);

export default withAuthentication(App);
