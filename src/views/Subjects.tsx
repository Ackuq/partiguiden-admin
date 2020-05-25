import React, { useEffect, useState } from 'react';
import { makeStyles, List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { getSubjects } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Subject {
  id: number;
  name: string;
}

const Subjects: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);

  const classes = useStyles();

  useEffect(() => {
    getSubjects().then((data) => {
      setSubjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Button startIcon={<AddIcon />} color="secondary" style={{ marginBottom: 10 }}>
        Add subject
      </Button>
      <List classes={{ root: classes.list }}>
        {subjects.map((subject, index) => (
          <>
            <ListItem key={subject.id}>
              <ListItemText primary={subject.name} />
            </ListItem>
            {index !== subjects.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </div>
  );
};

export default Subjects;
