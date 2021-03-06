import React, { useCallback, useEffect, useState } from 'react';
import {
  makeStyles,
  List,
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

import { getStandpoints, getSubjects } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

import { Standpoint } from '../types/standpoints';
import { ExpandMore } from '@material-ui/icons';
import { Subject } from '../types/subjects';
import StandpointItem from '../components/StandpointItem';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
  },
  list: {
    width: '100%',
  },
  select: {
    minWidth: '5rem',
  },
  toolbar: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  filter: {
    marginRight: '2rem',
  },
  standpointMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  const [subjects, setSubjects] = useState<Array<Subject>>();

  const classes = useStyles();

  const handleGetStandpoints = useCallback(() => {
    const promises: [Promise<Array<Standpoint>>, Promise<Array<Subject>>] = [
      getStandpoints(nullSubjects),
      getSubjects(),
    ];

    Promise.all(promises).then(([allStandpoints, allSubjects]) => {
      const data = allStandpoints.reduce((prev, curr) => {
        if (curr.party in prev) {
          return { ...prev, [curr.party]: [...prev[curr.party], curr] };
        } else {
          return { ...prev, [curr.party]: [curr] };
        }
      }, {} as StandpointDict);
      setSubjects(allSubjects);
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

  const sortStandpoints = (a: Standpoint, b: Standpoint) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
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
          <Accordion key={abbreviation} square TransitionProps={{ timeout: 500 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">{abbreviation}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List classes={{ root: classes.list }}>
                {standpoints[abbreviation].sort(sortStandpoints).map((standpoint, index) => (
                  <StandpointItem
                    key={standpoint.id}
                    standpoint={standpoint}
                    lastItem={index === standpoints[abbreviation].length - 1}
                    subjects={subjects}
                    classes={classes}
                  />
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default Standpoints;
