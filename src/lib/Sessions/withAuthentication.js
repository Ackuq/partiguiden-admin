import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = ({ firebase, ...rest }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        user => {
          localStorage.setItem('authUser', JSON.stringify(user));
          setAuthUser(user);
        },
        () => {
          localStorage.removeItem('authUser');
          setAuthUser(null);
        }
      );
      return () => listener();
    });

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...rest} />
      </AuthUserContext.Provider>
    );
  };

  WithAuthentication.propTypes = {
    firebase: object.isRequired
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
