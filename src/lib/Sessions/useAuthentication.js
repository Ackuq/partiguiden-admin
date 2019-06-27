import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';

const useAuthentication = () => {
  const firebase = useContext(FirebaseContext);
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

  return authUser;
};

export default useAuthentication;
