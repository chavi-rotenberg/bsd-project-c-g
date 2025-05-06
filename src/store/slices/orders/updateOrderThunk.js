
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateOrderThunk = createAsyncThunk(
    'updateOrderThunk',

    async (details) => {

        const response = await fetch("https://localhost:7044/api/Orders/Update", {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.token;
        }
        else {
            throw new Error('failed to fetch update OrderThunk');
        }
    }


)