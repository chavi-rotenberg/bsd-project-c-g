import { createAsyncThunk } from '@reduxjs/toolkit'

export const customersFetchThunk = createAsyncThunk(
    'customersFetchThunk',

    async () => {
        const response = await fetch("https://localhost:7044/api/Customers/GetAll");

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }

        else {
            alert("customersFetch")
            throw new Error("failed to fetch");
        }
    }
)