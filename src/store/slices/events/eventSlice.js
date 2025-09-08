import { createSlice } from "@reduxjs/toolkit"
import { addEventThunk } from "./addEventThunk";

import { editEventThunk } from "./editEventThunk";
import { deleteEventThunk } from "./deleteEventThunk";
import { eventFetchThunk } from "./eventFetchThunk";
import { findEventThunkById } from "./findEvenThunkById";
// import { searchEventThunk } from "./searchEventThunk";

export const INITAIL_STATE_EVENTS = {
    id: null,
    events: [{
        // name: "",
        // date: new Date(),
        // time: new Date().getTime(),
        // description: "",
        // id: ""
    }],
    evnt:{},
    searchEvents: [

    ]
}

export const eventSlice = createSlice({
    name: 'events',
    initialState: INITAIL_STATE_EVENTS,
    reducers: {

        editEvent: (state, action) => {
            state.events = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(eventFetchThunk.pending, (state, action) => {
            console.log(state)
        });

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(eventFetchThunk.fulfilled, (state, action) => {
            state.events = action.payload;
            console.log("succ");
        });
        //addEvent:

        // הוספת מקרה שהט'נק התחיל
        builder.addCase(addEventThunk.pending, (state, action) => {
            console.log(state)
        });

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addEventThunk.fulfilled, (state, action) => {
            state.events = action.payload;
            console.log("succ");
        });

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        

        //editEvent:

        // הוספת מקרה שהט'נק התחיל
        builder.addCase(editEventThunk.pending, (state, action) => {
        });

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(editEventThunk.fulfilled, (state, action) => {
            state.events = action.payload;

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(editEventThunk.rejected, (state, action) => {
        });

        //deleteEvent:

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteEventThunk.fulfilled, (state, action) => {
            // state.events=state.events.filter( e => e.id!=action.payload)
            state.events = action.payload;

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteEventThunk.rejected, (state, action) => {
        });
        
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(findEventThunkById.fulfilled, (state, action) => {
            // state.events=state.events.filter( e => e.id!=action.payload)
            state.evnt = action.payload;

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(findEventThunkById.rejected, (state, action) => {
        });

        // builder.addCase(searchEventThunk.pending, (state, action) => {
        //     console.log(state)
        // });

        // builder.addCase(searchEventThunk.fulfilled, (state, action) => {
        //     state.searchEvents = action.payload.events;
        // });

        // הוספת מקרה שהט'נק נכשל 
        // builder.addCase(searchEventThunk.rejected, (state, action) => {
        //     state.token = -1;
        //     console.log("couldent search event");
        // });
        
        
 
    }
});

export const { editEvent } = eventSlice.actions;