import { useEffect, useContext } from 'react';
import { object } from 'prop-types';

import AuthUserContext from './context';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../routes';

const condition = authUser => !!authUser;

const useAuthorization = history => {
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      user => {
        if (!condition(user)) {
          history.push(ROUTES.SIGN_IN);
        }
      },
      () => history.push(ROUTES.SIGN_IN)
    );
    return () => {
      listener();
    };
  });

  return condition(authUser);
};

useAuthorization.propTypes = {
  history: object.isRequired
};

export default useAuthorization;
