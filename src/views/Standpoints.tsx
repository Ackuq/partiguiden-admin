import React, { useCallback, useEffect, useState } from 'react';

import {
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
  SelectChangeEvent,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { css } from '@emotion/react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getStandpoints, getSubjects } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

import { Standpoint } from '../types/standpoints';
import { SubjectListEntry } from '../types/subjects';
import StandpointItem from '../components/StandpointItem';

const MenuBar = styled(AppBar)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
`
);
const MenuToolbar = styled(Toolbar)(
  ({ theme }) => `
    padding-top: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(2)}
`
);
const filterCSS = css`
  margin-right: 2rem;
`;

interface StandpointDict {
  [id: string]: Array<Standpoint>;
}

const Standpoints: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedParty, setSelectedParty] = useState<string>();
  const [nullSubjects, setNullSubjects] = useState<boolean>(false);
  const [standpoints, setStandpoints] = useState<StandpointDict>({});
  const [subjects, setSubjects] = useState<Array<SubjectListEntry>>();

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

  const handleSelectParty = (event: SelectChangeEvent<string>) => {
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
      <MenuBar position="sticky">
        <MenuToolbar>
          <FormControl css={filterCSS}>
            <InputLabel id="party-selector-label">Party</InputLabel>
            <Select
              css={css`
                min-width: 5rem;
              `}
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
            css={filterCSS}
            control={<Checkbox checked={nullSubjects} onChange={handleNullSubjects} />}
            label="Only uncategorized"
          />
        </MenuToolbar>
      </MenuBar>
      {Object.keys(standpoints)
        .filter((partyId) => !selectedParty || partyId === selectedParty)
        .map((partyId) => (
          <Accordion key={partyId} square TransitionProps={{ timeout: 500 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">{partyId}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List
                css={css`
                  width: 100%;
                `}
              >
                {standpoints[partyId].sort(sortStandpoints).map((standpoint, index) => (
                  <StandpointItem
                    key={standpoint.id}
                    standpoint={standpoint}
                    lastItem={index === standpoints[partyId].length - 1}
                    subjects={subjects}
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
