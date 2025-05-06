import { createAsyncThunk } from '@reduxjs/toolkit'

export const findCustomerThunk = createAsyncThunk(
    'findCustomerThunk',

    async ({ id }) => {

        const response = await fetch(`https://localhost:7044/api/Customers/GetById/${id}`,)
        if (response.ok) {
            const data = await response.json();
            console.log("fetch success get event");
            return data.customers;
        }

        else {
            alert("findLogin")
            throw new Error("failed to fetch");
        }
    }
)