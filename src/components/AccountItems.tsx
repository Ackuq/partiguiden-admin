import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowBack from '@material-ui/icons/ArrowBack';

import { logout } from '../lib/ApiStore';

const AccountItems: React.FC = () => {
  return (
    <ListItem button onClick={logout}>
      <ListItemIcon>
        <ArrowBack />
      </ListItemIcon>
      <ListItemText>Log out</ListItemText>
    </ListItem>
  );
};

export default AccountItems;
