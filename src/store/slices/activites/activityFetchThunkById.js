import { createAsyncThunk } from '@reduxjs/toolkit'

export const activityFetchThunkById = createAsyncThunk(
    'activityFetchThunkById',

    async ({id}) => {
        const response = await fetch(`https://localhost:7044/api/Activites/GetByid/${id}`);

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