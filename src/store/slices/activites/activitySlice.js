import { createSlice } from '@reduxjs/toolkit'
import { addActivityThunk } from './addActivityThunk';
import { activitiesFetch, activitiesFetchThunk } from './activitiesFetch';
//import { findActivityThunk } from './findActivityThunk';
import { deleteActivityThunk } from './deleteActivityThunk';
import { activitiyFetchThunkById, activityFetchThunkById } from './activityFetchThunkById';
import { updateActivityThunk } from './updateActivityThunk';

const INITIAL_STATE_USER = {
    activityName: "",
    Id: "",
    isLoading: false,
    activities: [],
    activity: {},
    token: null,
    sucsses: false,
    failed: false,
    MyOrders:[],
    isM:-1
}

export const activitiesSlice = createSlice({

    name: 'activity',
    initialState: INITIAL_STATE_USER,
    reducers: {
        editActivity: (state, action) => {
            state.activities = action.payload;
        },
        // editUserName: (state, action) => {
        //     state.InstituteName = action.payload;
        // },
        // editIsM: (state, action) => {
        //     state.isM = action.payload;
        // },
        editToken: (state, action) => {
            state.token = action.payload;
        }
    },

    extraReducers: (builder) => {
        //add

        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addActivityThunk.fulfilled, (state, action) => {
            debugger
            // state.token = action.meta.org.activity;
            state.activities=action.payload
            state.token=0;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(addActivityThunk.rejected, (state, action) => {
            state.token = -2;
        });

        //update

        //הוספת מקרה שהט'נק התחיל
        builder.addCase(updateActivityThunk.pending, (state, action) => {
        });
        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(updateActivityThunk.fulfilled, (state, action) => {
            state.activities=action.payload
            // state.token = action.payload;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(updateActivityThunk.rejected, (state, action) => {
            state.failed = true;
        });

        //delete

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteActivityThunk.fulfilled, (state, action) => {
           state.activities=action.payload;
            // state.events=state.events.filter( e => e.id!=action.payload)

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteActivityThunk.rejected, (state, action) => {
        });

        //getAll

        builder.addCase(activitiesFetch.pending, (state, action) => {
           
        });

        builder.addCase(activitiesFetch.fulfilled, (state, action) => {
            state.activities = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(activitiesFetch.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });

        //getById

        builder.addCase(activityFetchThunkById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.MyOrders = action.payload.orders;
            state.activity=action.payload;
        });



    }
})
export const { editActivity, editToken,editIsM } = activitiesSlice.actions;