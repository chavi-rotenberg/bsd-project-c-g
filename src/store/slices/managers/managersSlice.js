import { createSlice } from '@reduxjs/toolkit'
import { addManagerThunk } from './addManagerThunk';
import { managersFetchThunk } from './managersFetch';
//import { findManagerThunk } from './findManagerThunk';
import { deleteManagerThunk } from './deleteManagerThunk';
import { managersFetchThunkById } from './managerFetchThunkById';
import { updateManagerThunk } from './updateManagerThunk';

const INITIAL_STATE_USER = {
    managerName: "",
    Id: "",
    managers: [],
    manager: {},
    token: null,
    sucsses: false,
    failed: false,
    MyCstomers:[],
    isM:-1
}

export const managersSlice = createSlice({

    name: 'manager',
    initialState: INITIAL_STATE_USER,
    reducers: {
        editManager: (state, action) => {
            state.managers = action.payload;
        },
        // editUserName: (state, action) => {
        //     state.InstituteName = action.payload;
        // },
        editIsM: (state, action) => {
            state.isM = action.payload;
        },
        editToken: (state, action) => {
            state.token = action.payload;
        }
    },

    extraReducers: (builder) => {
        //add

        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addManagerThunk.fulfilled, (state, action) => {
            debugger
            // state.token = action.meta.org.manager;
            state.managers=action.payload
            state.token=0;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(addManagerThunk.rejected, (state, action) => {
            state.token = -2;
        });

        //update

        //הוספת מקרה שהט'נק התחיל
        builder.addCase(updateManagerThunk.pending, (state, action) => {
        });
        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(updateManagerThunk.fulfilled, (state, action) => {
            state.managers=action.payload
            // state.token = action.payload;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(updateManagerThunk.rejected, (state, action) => {
            state.failed = true;
        });

        //delete

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteManagerThunk.fulfilled, (state, action) => {
           state.managers=action.payload;
            // state.events=state.events.filter( e => e.id!=action.payload)

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteManagerThunk.rejected, (state, action) => {
        });

        //getAll

        builder.addCase(managersFetchThunk.pending, (state, action) => {
           
        });

        builder.addCase(managersFetchThunk.fulfilled, (state, action) => {
            state.managers = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(managersFetchThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });

        //getById

        builder.addCase(managersFetchThunkById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.MyOrders = action.payload.orders;
            state.manager=action.payload;
        });



    }
})
export const { editManager, editToken,editIsM } = managersSlice.actions;