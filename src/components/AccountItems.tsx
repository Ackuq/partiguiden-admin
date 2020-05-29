import React, { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowBack from '@material-ui/icons/ArrowBack';
import AccountBox from '@material-ui/icons/AccountBox';

import { logout } from '../lib/ApiStore';
import ChangePasswordModal from './ChangePasswordModal';

const AccountItems: React.FC = () => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const toggleChangePasswordModal = () => {
    setChangePasswordModal((prevState) => !prevState);
  };

  return (
    <>
      <ListItem button onClick={toggleChangePasswordModal}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText>Change password</ListItemText>
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ArrowBack />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </ListItem>

      <ChangePasswordModal open={changePasswordModal} onClose={toggleChangePasswordModal} />
    </>
  );
};

export default AccountItems;
