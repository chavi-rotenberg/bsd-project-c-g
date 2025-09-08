import { createAsyncThunk } from '@reduxjs/toolkit'

export const activitiesFetch = createAsyncThunk(
    'activitiesFetch',

    async () => {
        const response = await fetch("https://localhost:7044/api/Activites/GetAll");

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }

        else {
            alert("managersFetch")
            throw new Error("failed to fetch");
        }
    }
)