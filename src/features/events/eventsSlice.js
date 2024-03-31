// src/features/events/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        items: [],
    },
    reducers: {
        addEvent: (state, action) => {
            state.items.push(action.payload);
        },
        removeEvent: (state, action) => {
            state.items = state.items.filter(event => event.id !== action.payload);
        },
        editEvent: (state, action) => {
            const { id, ...updates } = action.payload;
            const index = state.items.findIndex(event => event.id === id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...updates };
            }
        },
    },
});

export const { addEvent, removeEvent, editEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
