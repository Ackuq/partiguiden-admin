import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';

import { useAuthorization } from '../../lib/Sessions';

const HomePage = ({ history }) => {
  const isAuthed = useAuthorization(history);
  return <React.Fragment>{isAuthed && <div>Home</div>}</React.Fragment>;
};

HomePage.propTypes = {
  history: object.isRequired
};

export default withRouter(HomePage);
