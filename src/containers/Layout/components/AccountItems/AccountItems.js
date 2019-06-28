import React, { useContext, useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { ArrowBack, AccountBox } from '@material-ui/icons';

import ChangePasswordForm from '../../../../components/ChangePasswordForm';
import { FirebaseContext } from '../../../../lib/Firebase';

const AccountItems = () => {
  const firebase = useContext(FirebaseContext);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(prevState => !prevState);

  return (
    <React.Fragment>
      <ListItem button onClick={handleModal}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText>Ändra lösenord</ListItemText>
      </ListItem>
      <ListItem button onClick={firebase.doSignOut}>
        <ListItemIcon>
          <ArrowBack />
        </ListItemIcon>
        <ListItemText>Logga ut</ListItemText>
      </ListItem>

      <Dialog open={showModal} fullWidth onBackdropClick={handleModal}>
        <DialogContent>
          <ChangePasswordForm firebase={firebase} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Stäng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AccountItems;
