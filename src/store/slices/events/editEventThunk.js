import { createAsyncThunk } from '@reduxjs/toolkit'

export const editEventThunk = createAsyncThunk(
    'editEventThunk',
    async ({ details }) => {

        const response = await fetch(`https://localhost:7044/api/Event/Update`,
            {
                method: 'PUT',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            const data=response.json()
            return data;
           // console.log('succses to Edit');
        }
        else {
            alert("editLogin")
            throw new Error("failed to fetch");
        }
    }
)