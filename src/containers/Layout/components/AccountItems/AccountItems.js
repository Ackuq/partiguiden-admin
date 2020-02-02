import React, { useContext, useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ArrowBack from '@material-ui/icons/ArrowBack';
import AccountBox from '@material-ui/icons/AccountBox';

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
