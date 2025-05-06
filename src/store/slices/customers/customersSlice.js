import { createSlice } from '@reduxjs/toolkit'
import { addCustomerThunk } from './addCustomerThunk';
import { customersFetchThunk } from './customersFetch';
//import { findCustomerThunk } from './findCustomerThunk';
import { deleteCustomerThunk } from './deleteCustomerThunk';
import { customersFetchThunkById } from './customerFetchThunkById';
import { updateCustomerThunk } from './updateCustomerThunk';

const INITIAL_STATE_USER = {
    InstituteName: -1,
    InstituteId: "",
    customers: [],
    customer: {},
    token: null,
    sucsses: false,
    failed: false,
    MyOrders:[],
    isC:-1
}

export const customersSlice = createSlice({

    name: 'customer',
    initialState: INITIAL_STATE_USER,
    reducers: {
        editCustomer: (state, action) => {
            state.customers = action.payload;
        },
        // editUserName: (state, action) => {
        //     state.InstituteName = action.payload;
        // },
        editIsC: (state, action) => {
            state.isC = action.payload;
        },
        editToken: (state, action) => {
            state.token = action.payload;
        }
    },

    extraReducers: (builder) => {
        //add

        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addCustomerThunk.fulfilled, (state, action) => {
            debugger
            // state.token = action.meta.org.customer;
            state.customers=action.payload
            state.token=0;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(addCustomerThunk.rejected, (state, action) => {
            state.token = -2;
        });

        //update

        //הוספת מקרה שהט'נק התחיל
        builder.addCase(updateCustomerThunk.pending, (state, action) => {
        });
        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(updateCustomerThunk.fulfilled, (state, action) => {
            state.customers=action.payload
            // state.token = action.payload;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(updateCustomerThunk.rejected, (state, action) => {
            state.failed = true;
        });

        //delete

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteCustomerThunk.fulfilled, (state, action) => {
           state.customers=action.payload;
            // state.events=state.events.filter( e => e.id!=action.payload)

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteCustomerThunk.rejected, (state, action) => {
        });

        //getAll

        builder.addCase(customersFetchThunk.pending, (state, action) => {
           
        });

        builder.addCase(customersFetchThunk.fulfilled, (state, action) => {
            state.customers = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(customersFetchThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });

        //getById

        builder.addCase(customersFetchThunkById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.MyOrders = action.payload.orders;
            state.customer=action.payload;
        });



    }
})
export const { editCustomer, editToken,editIsC } = customersSlice.actions;