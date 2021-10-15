import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ArrowBack from '@mui/icons-material/ArrowBack';

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
