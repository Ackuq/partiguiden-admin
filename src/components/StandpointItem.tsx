import React, { useState } from 'react';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  Divider,
  MenuItem,
  SelectChangeEvent,
  styled,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { Standpoint } from '../types/standpoints';
import { SubjectListEntry } from '../types/subjects';
import { updateStandpointCategory } from '../lib/ApiStore';
import snackbarRef from '../lib/snackbarRef';

const Root = styled(ListItem)(
  ({ theme }) => `
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
`
);

interface Props {
  standpoint: Standpoint;
  lastItem: boolean;
  subjects?: Array<SubjectListEntry>;
  deleteStandpointCallback: (id: string, partyId: string) => void;
  partyId: string;
}

const StandpointItem: React.FC<Props> = ({
  standpoint,
  lastItem,
  deleteStandpointCallback,
  partyId,
  subjects = [],
}) => {
  const getSubject = (currentSubject?: number): SubjectListEntry | undefined =>
    subjects.find((subject) => subject.id === currentSubject);

  const [currentSubject, setCurrentSubject] = useState(getSubject(standpoint.subject));

  const updateCategory = (event: SelectChangeEvent<string>) => {
    const newSubject: string | null = (event.target.value as string) ?? null;
    updateStandpointCategory(standpoint.id, newSubject).then((newStandpoint) => {
      snackbarRef.current?.updateSnack({ severity: 'success', text: 'Category updated' });
      setCurrentSubject(getSubject(newStandpoint.subject));
    });
  };

  return (
    <>
      <Root>
        <ListItemText
          primaryTypographyProps={{
            color: 'primary',
            component: 'a',
            href: standpoint.link,
            display: 'inline',
          }}
          primary={standpoint.title}
        />
        <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl>
            <InputLabel id={`category-${standpoint.id}-label`}>Category</InputLabel>
            <Select
              variant="standard"
              sx={{ m: 1, minWidth: '10rem' }}
              labelId={`category-${standpoint.id}-label`}
              value={currentSubject?.id.toString() ?? ''}
              onChange={updateCategory}
            >
              <MenuItem>-</MenuItem>
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            edge="end"
            aria-label={`delete-${standpoint.id}`}
            onClick={() => deleteStandpointCallback(standpoint.id, partyId)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </Root>

      {!lastItem && <Divider />}
    </>
  );
};

export default StandpointItem;
