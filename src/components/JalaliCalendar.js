import React, { useState, useEffect } from 'react';
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
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { is } from 'date-fns-jalali/locale';


function JalaliCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const [selectedDays, setSelectedDays] = React.useState([]);

  const EventDay = (props) => {
    const { selectedDays = [], day, outsideCurrentMonth, ...other } = props; 
    const normalizeDateToUTC = (date) => {
      const dateCopy = new Date(date);
      return new Date(Date.UTC(dateCopy.getFullYear(), dateCopy.getMonth(), dateCopy.getDate()));
    };
    
    const isSelected = !outsideCurrentMonth && selectedDays.some(selectedDay =>
      normalizeDateToUTC(new Date(selectedDay)).getTime() === normalizeDateToUTC(day).getTime()
    );
    return (
      <Badge color="secondary"
        style={isSelected ? {  right: '0'} : undefined}
        key={props.day.toString()}
        overlap="circular"
        variant={isSelected ? 'dot' : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}      
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  const fetchSelectedDays = () => {
    // Assuming your event dates are stored in a specific format, adjust the parsing as necessary
    const uniqueDays = new Set();
    events.forEach(event => {
      const eventDate = new Date(event.date); // Adjust parsing as necessary for your date format
      // Format the date to YYYY-MM-DD or another suitable format that ensures uniqueness
      const dayKey = eventDate.toISOString().split('T')[0];
      uniqueDays.add(dayKey);
    });

    // Convert the Set to an array and update the state
    setSelectedDays([...uniqueDays]);
    setIsLoading(false);
    console.log('*********************');
    console.log(selectedDays);
  };

  useEffect(() => {
    fetchSelectedDays();
  }, [events]); // Re-run when events change

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
    <div>
    {isLoading ? <DayCalendarSkeleton /> :
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DateCalendar
        mask="____/__/__"
        value={selectedDate}
        onChange={handleDateChange}
        // renderInput={(params) => <TextField {...params} />}
        slots={{
          day: EventDay,
        }}
        slotProps={{
          day: {
            selectedDays,
          },
        }}
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
    </LocalizationProvider>}
    </div>
  );
}

export default JalaliCalendar;
