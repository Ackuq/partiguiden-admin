import React, { useImperativeHandle, useState } from 'react';

import SnackbarInner from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

interface Message {
  severity: AlertProps['severity'];
  text: string;
}

export interface SnackbarInterface {
  updateSnack: (message: Message) => void;
}

const Snackbar = React.forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>({ severity: 'success', text: '' });

  const updateSnack = (newMessage: Message) => {
    setMessage(newMessage);
    setOpen(true);
  };

  useImperativeHandle(
    ref,
    (): SnackbarInterface => ({
      updateSnack,
    }),
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarInner open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={message.severity}>
        {message.text}
      </Alert>
    </SnackbarInner>
  );
});

export default Snackbar;
