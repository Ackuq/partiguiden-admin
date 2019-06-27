import React from 'react';
import { withAuthorization } from '../../lib/Sessions';

const HomePage = () => {
  return <div>Home</div>;
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
