import React from 'react';
import { func, node, oneOfType } from 'prop-types';

const Layout = ({ children }) => (
  <div>
    Navigation<div>{children}</div>
  </div>
);

Layout.propTypes = {
  children: oneOfType([func, node]).isRequired
};

export default Layout;
