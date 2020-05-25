import React, { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ArrowBack from '@material-ui/icons/ArrowBack';
import AccountBox from '@material-ui/icons/AccountBox';

import ApiStore from '../lib/ApiStore';

const AccountItems: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(prevState => !prevState);

  return (
    <>
      <ListItem button onClick={handleModal}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText>Ändra lösenord</ListItemText>
      </ListItem>
      <ListItem button onClick={ApiStore.logout}>
        <ListItemIcon>
          <ArrowBack />
        </ListItemIcon>
        <ListItemText>Logga ut</ListItemText>
      </ListItem>

      <Dialog open={showModal} fullWidth onBackdropClick={handleModal}>
        <DialogActions>
          <Button onClick={handleModal}>Stäng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountItems;
