import React, { useState } from 'react';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { addEvent, editEvent } from '../features/events/eventsSlice'; // Import editEvent action
import { useSelector } from 'react-redux';
import DayCell from './DayCell'; // A new component to render each day
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Badge } from '@mui/material';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';


function JalaliCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (eventDetails) => {
    dispatch(addEvent({ date: selectedDate, ...eventDetails }));
    setOpenModal(false);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleDelete = (event) => {
    // Handle delete logic here, e.g., dispatching an action to remove the event from Redux store
    console.log('Deleting event:', event);
  };

  const handleUpdateEvent = (updatedEvent) => {
    dispatch(editEvent({ date: selectedDate, ...updatedEvent })); // Dispatch the editEvent action
    setOpen(false);
    setSelectedEvent(null); // Clear selected event after updating
  };

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return selectedDate.toDateString() === eventDate.toDateString();
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DatePicker
        mask="____/__/__"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      {dayEvents.map((event, index) => (
        <div key={index}>
          {event.title} - {event.time} {/* Adjust event properties as needed */}
          <IconButton onClick={() => handleEdit(event)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(event)} size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button onClick={handleOpenModal}>Add Event</Button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <AddEventForm initialEvent={selectedEvent} onSubmit={handleAddEvent} onCancel={handleCloseModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Modal for editing events */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <EditEventForm
            initialEvent={selectedEvent} // Pass the selected event to the form
            onSubmit={handleUpdateEvent} // Use handleUpdateEvent for submitting updates
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default JalaliCalendar;
