// src/components/EventList.js
import React from 'react';
import { useSelector } from 'react-redux';

function EventList() {
  const events = useSelector((state) => state.events.items);

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          {event.title}
          {/* Here, you could add buttons or actions to edit or remove an event */}
        </div>
      ))}
    </div>
  );
}

export default EventList;
