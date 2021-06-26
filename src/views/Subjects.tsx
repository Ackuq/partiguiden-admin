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
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import { getSubjects, deleteSubject } from '../lib/ApiStore';
import LoadingIndicator from '../components/LoadingIndicator';
import AddSubjectDialog from '../components/AddSubjectDialog';

import { SubjectListEntry } from '../types/subjects.d';
import ChangeSubjectDialog from '../components/ChangeSubjectDialog';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Subjects: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Array<SubjectListEntry>>([]);
  const [addSubject, setAddSubject] = useState(false);
  const [changeSubject, setChangeSubject] = useState<SubjectListEntry>();

  const classes = useStyles();

  const handleGetSubjects = () => {
    getSubjects().then((data) => {
      setSubjects(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetSubjects();
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

  const changeSubjectOpen = (subject: SubjectListEntry) => {
    setChangeSubject(subject);
  };

  const changeSubjectClose = () => {
    setChangeSubject(undefined);
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
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label={`change-${subject.name}`}
                  onClick={() => changeSubjectOpen(subject)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label={`delete-${subject.name}`}
                  onClick={() => deleteCallback(subject.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index !== subjects.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <AddSubjectDialog
        subjects={subjects}
        handleGetSubjects={handleGetSubjects}
        open={addSubject}
        onClose={toggleAddSubjectModal}
      />
      {changeSubject && (
        <ChangeSubjectDialog
          subjects={subjects}
          handleGetSubjects={handleGetSubjects}
          open={!!changeSubject}
          onClose={changeSubjectClose}
          subject={changeSubject}
        />
      )}
    </div>
  );
};

export default Subjects;
