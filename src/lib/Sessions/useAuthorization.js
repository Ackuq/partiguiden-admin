import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthUserContext from './context';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../routes';

const condition = authUser => !!authUser;

const useAuthorization = () => {
  const history = useHistory();

  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      user => {
        if (!condition(user)) {
          history.push(ROUTES.SIGN_IN);
        }
      },
      () => {
        history.push(ROUTES.SIGN_IN);
      }
    );
    return () => {
      listener();
    };
  });

  return condition(authUser);
};

export default useAuthorization;
