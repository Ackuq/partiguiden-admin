import React from 'react';
import { useNavigate } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import SubjectIcon from '@mui/icons-material/Subject';
import PartiesIcon from '@mui/icons-material/People';
import StandpointIcon from '@mui/icons-material/Note';

import * as ROUTES from '../lib/routes';

const NavItems: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem
        button
        onClick={() => {
          navigate(ROUTES.SUBJECTS);
        }}
      >
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText>Subjects</ListItemText>
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate(ROUTES.PARTIES);
        }}
      >
        <ListItemIcon>
          <PartiesIcon />
        </ListItemIcon>
        <ListItemText>Parties</ListItemText>
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate(ROUTES.STANDPOINTS);
        }}
      >
        <ListItemIcon>
          <StandpointIcon />
        </ListItemIcon>
        <ListItemText>Standpoints</ListItemText>
      </ListItem>
    </>
  );
};

export default NavItems;
