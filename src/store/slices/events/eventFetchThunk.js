import { createAsyncThunk } from '@reduxjs/toolkit'

export const eventFetchThunk = createAsyncThunk(
    'eventFetchThunk',

    async () => {
        const response = await fetch("https://localhost:7044/api/Event/GetAll");

        if (response.ok) {
            const data = await response.json();
            return data;
        }

        else {
            //alert("customersFetch")
            throw new Error("failed to fetch");
        }
    }
)