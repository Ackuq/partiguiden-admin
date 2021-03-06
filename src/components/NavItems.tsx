import React from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import SubjectIcon from '@material-ui/icons/Subject';
import PartiesIcon from '@material-ui/icons/People';
import StandpointIcon from '@material-ui/icons/Note';

import * as ROUTES from '../lib/routes';

const NavItems: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <ListItem button onClick={() => history.push(ROUTES.SUBJECTS)}>
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText>Subjects</ListItemText>
      </ListItem>
      <ListItem button onClick={() => history.push(ROUTES.PARTIES)}>
        <ListItemIcon>
          <PartiesIcon />
        </ListItemIcon>
        <ListItemText>Parties</ListItemText>
      </ListItem>
      <ListItem button onClick={() => history.push(ROUTES.STANDPOINTS)}>
        <ListItemIcon>
          <StandpointIcon />
        </ListItemIcon>
        <ListItemText>Standpoints</ListItemText>
      </ListItem>
    </>
  );
};

export default NavItems;
