import React from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';

import * as ROUTES from '../../../../lib/routes';

const NavItems = () => {
  const history = useHistory();

  return (
    <>
      <ListItem button onClick={() => history.push(ROUTES.HOME)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>Hem</ListItemText>
      </ListItem>
      <ListItem button onClick={() => history.push(ROUTES.SUBJECTS)}>
        <ListItemText>Granska sakfrågor</ListItemText>
      </ListItem>
    </>
  );
};

export default NavItems;
