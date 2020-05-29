import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { getSubjects, deleteSubject } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';
import AddSubjectDialog from '../components/AddSubjectModal';

import { Subject } from '../types/subjects.d';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Subjects: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const [addSubject, setAddSubject] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    getSubjects().then((data) => {
      setSubjects(data);
      setLoading(false);
    });
  }, []);

  const deleteCallback = (id: number) => {
    const confirm = window.confirm('Delete this subject?');

    if (confirm) {
      deleteSubject(id).then(() => {
        setSubjects((prevState) => prevState.filter((subject) => subject.id !== id));
      });
    }
  };

  const toggleAddSubjectModal = () => {
    setAddSubject((prevState) => !prevState);
  };

  const appendSubject = (newSubject: Subject) => {
    setSubjects((prevState) => prevState.concat(newSubject));
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        color="secondary"
        style={{ marginBottom: 10 }}
        onClick={toggleAddSubjectModal}
      >
        Add subject
      </Button>
      <List classes={{ root: classes.list }}>
        {subjects.map((subject, index) => (
          <React.Fragment key={subject.id}>
            <ListItem>
              <ListItemText primary={subject.name} />
              {subject.id !== 1 && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteCallback(subject.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            {index !== subjects.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <AddSubjectDialog
        subjects={subjects}
        appendSubject={appendSubject}
        open={addSubject}
        onClose={toggleAddSubjectModal}
      />
    </div>
  );
};

export default Subjects;
