import { createAsyncThunk } from '@reduxjs/toolkit'

export const findActivityThunk = createAsyncThunk(
    'findActivityThunk',

    async ({ id }) => {

        const response = await fetch(`https://localhost:7044/api/Activities/GetById/${id}`,)
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