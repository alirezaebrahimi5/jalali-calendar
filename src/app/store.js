// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});
