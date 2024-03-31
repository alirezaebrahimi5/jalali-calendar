import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button } from '@mui/material';

function DayCell({ day, events }) {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = (event) => {
    // Handle delete logic here, e.g., dispatching an action to remove the event from Redux store
    console.log('Deleting event:', event);
  };

  return (
    <div>
      <div style={{ cursor: 'pointer' }}>
        {day.getDate()}
        {/* Display event details with edit and delete buttons */}
        {events.map((event, index) => (
          <div key={index}>
            {event.title} - {event.time}
            <IconButton onClick={() => handleClickOpen(event)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(event)} size="small">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {/* Modal for editing events */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <EditEventForm
            initialEvent={selectedEvent}
            onSubmit={handleClose} // Pass handleClose to close the modal after submission
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DayCell;
