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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getStandpoints, getSubjects } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

import { Standpoint } from '../types/standpoints';
import { SubjectListEntry } from '../types/subjects';
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
  [id: string]: Array<Standpoint>;
}

const Standpoints: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedParty, setSelectedParty] = useState<string>();
  const [nullSubjects, setNullSubjects] = useState<boolean>(false);
  const [standpoints, setStandpoints] = useState<StandpointDict>({});
  const [subjects, setSubjects] = useState<Array<SubjectListEntry>>();

  const classes = useStyles();

  const handleGetStandpoints = useCallback(() => {
    const promises: [Promise<Array<Standpoint>>, Promise<Array<SubjectListEntry>>] = [
      getStandpoints(nullSubjects),
      getSubjects(),
    ];

    Promise.all(promises).then(([allStandpoints, allSubjects]) => {
      const data = allStandpoints.reduce((prev, curr) => {
        if (curr.party in prev) {
          return { ...prev, [curr.party]: [...prev[curr.party], curr] };
        }
        return { ...prev, [curr.party]: [curr] };
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
              {Object.keys(standpoints).map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
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
        .filter((partyId) => !selectedParty || partyId === selectedParty)
        .map((partyId) => (
          <Accordion key={partyId} square TransitionProps={{ timeout: 500 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">{partyId}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List classes={{ root: classes.list }}>
                {standpoints[partyId].sort(sortStandpoints).map((standpoint, index) => (
                  <StandpointItem
                    key={standpoint.id}
                    standpoint={standpoint}
                    lastItem={index === standpoints[partyId].length - 1}
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
