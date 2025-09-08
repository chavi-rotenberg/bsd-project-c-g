import { createAsyncThunk } from '@reduxjs/toolkit'

export const managersFetchThunkById = createAsyncThunk(
    'managersFetchThunkById',

    async ({id}) => {
        const response = await fetch(`https://localhost:7044/api/Managers/GetById/${id}`);

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