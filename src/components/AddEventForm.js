import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function AddEventForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, time });
    setTitle('');
    setTime('');
  };

  return (
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
      <Button type="submit">Add Event</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </form>
  );
}

export default AddEventForm;
