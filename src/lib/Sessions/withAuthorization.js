import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { object } from 'prop-types';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../routes';

const withAuthorization = condition => Component => {
  const WithAuthorization = ({ firebase, history, ...rest }) => {
    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
          }
        },
        () => history.push(ROUTES.SIGN_IN)
      );
      return () => {
        listener();
      };
    });

    return (
      <AuthUserContext.Consumer>
        {authUser => (condition(authUser) ? <Component {...rest} /> : null)}
      </AuthUserContext.Consumer>
    );
  };

  WithAuthorization.propTypes = {
    firebase: object.isRequired,
    history: object.isRequired
  };

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
