import { createAsyncThunk } from '@reduxjs/toolkit'

export const findManagerThunk = createAsyncThunk(
    'findManagerThunk',

    async ({ id }) => {

        const response = await fetch(`https://localhost:7044/api/Managers/GetById/${id}`,)
        if (response.ok) {
            const data = await response.json();
            console.log("fetch success get event");
            return data.managers;
        }

        else {
            alert("findLogin")
            throw new Error("failed to fetch");
        }
    }
)