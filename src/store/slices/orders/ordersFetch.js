import { createAsyncThunk } from '@reduxjs/toolkit'

export const ordersFetchThunk = createAsyncThunk(
    'ordersFetchThunk',

    async () => {
        const response = await fetch("https://localhost:7044/api/Order/GetAll");

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }

        else {
            alert("ordersFetch")
            throw new Error("failed to fetch");
        }
    }
)