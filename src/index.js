import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './containers/App';
import Firebase, { FirebaseContext } from './lib/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
