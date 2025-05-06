import { createAsyncThunk } from '@reduxjs/toolkit'

export const ordersFetchThunkById = createAsyncThunk(
    'ordersFetchThunkById',

    async (id) => {
        const response = await fetch(`https://localhost:7044/api/Order/GetByCustomerId/${id}`);

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