import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editEvent } from '../features/events/eventsSlice';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function EditEventForm({ initialEvent, onSubmit }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setTime(initialEvent.time || '');
    }
  }, [initialEvent]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent({ ...initialEvent, title, time }));
    onSubmit(); // Call onSubmit without passing any argument to indicate the form submission
  };

  return (
    <Dialog open={Boolean(initialEvent)}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Event Time"
            type="text"
            fullWidth
            variant="standard"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <DialogActions>
            <Button onClick={onSubmit}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditEventForm;
