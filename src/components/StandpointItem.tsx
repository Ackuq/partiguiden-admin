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
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';

import { Standpoint } from '../types/standpoints';
import { Subject } from '../types/subjects';
import { updateStandpointCategory } from '../lib/ApiStore';
import { snackbarRef } from '../lib/snackbarRef';

interface Props {
  standpoint: Standpoint;
  lastItem: boolean;
  subjects?: Array<Subject>;
  classes: ClassNameMap<'standpointMargin'>;
}

const StandpointItem: React.FC<Props> = ({ standpoint, lastItem, classes, subjects = [] }) => {
  const getSubject = (currentSubject?: number): Subject | undefined =>
    subjects.find((subject) => subject.id === currentSubject);

  const [currentSubject, setCurrentSubject] = useState(getSubject(standpoint.subject));

  const updateCategory = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const newSubject: string | null = (event.target.value as string) ?? null;
    updateStandpointCategory(standpoint.id, newSubject).then((newStandpoint) => {
      snackbarRef.current?.updateSnack({ severity: 'success', text: 'Category updated' });
      setCurrentSubject(getSubject(newStandpoint.subject));
    });
  };

  return (
    <React.Fragment>
      <ListItem classes={{ container: classes.standpointMargin }}>
        <ListItemText
          primaryTypographyProps={{
            color: 'primary',
            component: 'a',
            href: standpoint.link,
            display: 'inline',
          }}
          primary={standpoint.title}
        />
        <ListItemSecondaryAction>
          <FormControl>
            <InputLabel id={`category-${standpoint.id}-label`}>Category</InputLabel>
            <Select
              labelId={`category-${standpoint.id}-label`}
              style={{ minWidth: '10rem' }}
              value={currentSubject?.id ?? ''}
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
        </ListItemSecondaryAction>
      </ListItem>

      {!lastItem && <Divider />}
    </React.Fragment>
  );
};
export default StandpointItem;
