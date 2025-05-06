import { configureStore } from '@reduxjs/toolkit'
import { customersSlice } from './slices/customers/customersSlice'
import { combineSlices } from "@reduxjs/toolkit"
import { ordersSlice } from './slices/orders/orderSlice';
import { eventSlice } from './slices/events/eventSlice';
import { managersSlice } from './slices/managers/managersSlice';
import { activitiesSlice} from './slices/activites/activitySlice';

// import { eventSlice } from './slices/eventSlice';

const reducers = combineSlices(customersSlice,ordersSlice,eventSlice,managersSlice,activitiesSlice);

export const STORE = configureStore({
    reducer: reducers,
})