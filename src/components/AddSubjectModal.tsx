import React from 'react';
import { Dialog } from '@material-ui/core';

interface Props {
  open: boolean;
}

const AddSubjectDialog: React.FC<Props> = ({ open }) => {
  return <Dialog open={open}>Hej</Dialog>;
};

export default AddSubjectDialog;
