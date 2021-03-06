import React, { useCallback, useEffect, useState } from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { getStandpoints } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

import { Standpoint } from '../types/standpoints';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  appBar: {
    marginBottom: '1rem',
  },
  list: {
    width: '100%',
  },
  select: {
    minWidth: '5rem',
  },
  toolbar: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  filter: {
    marginRight: '2rem',
  },
}));

interface StandpointDict {
  [abbreviation: string]: Array<Standpoint>;
}

const Standpoints: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedParty, setSelectedParty] = useState<string>();
  const [nullSubjects, setNullSubjects] = useState<boolean>(false);
  const [standpoints, setStandpoints] = useState<StandpointDict>({});

  const classes = useStyles();

  const handleGetStandpoints = useCallback(() => {
    getStandpoints(nullSubjects).then((standpoints) => {
      const data = standpoints.reduce((prev, curr) => {
        if (curr.party in prev) {
          return { ...prev, [curr.party]: [...prev[curr.party], curr] };
        } else {
          return { ...prev, [curr.party]: [curr] };
        }
      }, {} as StandpointDict);
      setStandpoints(data);
      setLoading(false);
    });
  }, [nullSubjects]);

  useEffect(() => {
    handleGetStandpoints();
  }, [nullSubjects, handleGetStandpoints]);

  if (loading) {
    return <LoadingIndicator />;
  }

  const handleSelectParty = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setSelectedParty(event.target.value as string);
  };

  const handleNullSubjects = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNullSubjects(event.target.checked);
  };

  return (
    <div>
      <AppBar position="sticky" classes={{ root: classes.appBar }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <FormControl classes={{ root: classes.filter }}>
            <InputLabel id="party-selector-label">Party</InputLabel>
            <Select
              classes={{ root: classes.select }}
              value={selectedParty}
              labelId="party-selector-label"
              onChange={handleSelectParty}
            >
              <MenuItem>-</MenuItem>
              {Object.keys(standpoints).map((abbreviation) => (
                <MenuItem key={abbreviation} value={abbreviation}>
                  {abbreviation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            classes={{ root: classes.filter }}
            control={<Checkbox checked={nullSubjects} onChange={handleNullSubjects} />}
            label="Only uncategorized"
          />
        </Toolbar>
      </AppBar>
      {Object.keys(standpoints)
        .filter((abbreviation) => !selectedParty || abbreviation === selectedParty)
        .map((abbreviation) => (
          <Accordion key={abbreviation}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">{abbreviation}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List classes={{ root: classes.list }}>
                {standpoints[abbreviation].map((standpoint, index) => (
                  <React.Fragment key={standpoint.id}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{
                          color: 'primary',
                          component: 'a',
                          href: standpoint.link,
                        }}
                        primary={standpoint.title}
                        secondary={standpoint.subject || 'Uncategorized'}
                      />
                    </ListItem>
                    {index !== standpoints[abbreviation].length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      {/* {standpoints.map((standpoint, index) => (
          <React.Fragment key={standpoint.id}>
            <ListItem>
              <ListItemText primary={standpoint.title} />
            </ListItem>
            {index !== standpoints.length - 1 && <Divider />}
          </React.Fragment>
        ))} */}
    </div>
  );
};

export default Standpoints;
