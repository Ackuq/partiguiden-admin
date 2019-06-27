import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { func, node, oneOfType } from 'prop-types';

import * as ROUTES from '../../lib/routes';
import { useAuthentication, AuthUserContext } from '../../lib/Sessions';

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

const App = () => {
  return (
    <AuthUserContext.Provider value={useAuthentication()}>
      <Router>
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <AppLayoutRoute path={ROUTES.HOME} component={HomePage} />
      </Router>
    </AuthUserContext.Provider>
  );
};

export default App;
