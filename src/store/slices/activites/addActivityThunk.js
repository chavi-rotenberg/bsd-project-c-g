import { createAsyncThunk } from '@reduxjs/toolkit'

export const addActivityThunk = createAsyncThunk(
    'addActivityThunk',
    async ({details}) => {

        const response = await fetch("https://localhost:7044/api/Activites/Add",
            {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            debugger
             const data = await response.json();

            return data

        }
        else throw new Error('failed to fetch add login');
    }
)