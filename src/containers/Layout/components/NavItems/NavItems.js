import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';

import * as ROUTES from '../../../../lib/routes';

const NavItems = ({ history }) => {
  return (
    <React.Fragment>
      <ListItem button onClick={() => history.push(ROUTES.HOME)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>Hem</ListItemText>
      </ListItem>
      <ListItem button onClick={() => history.push(ROUTES.SUBJECTS)}>
        <ListItemText>Granska sakfrågor</ListItemText>
      </ListItem>
    </React.Fragment>
  );
};

NavItems.propTypes = {
  history: object.isRequired
};

export default withRouter(NavItems);
