import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteManagerThunk = createAsyncThunk(
    'deleteManagerThunk',
    async ( id ) => {

        const response = await fetch(`https://localhost:7044/api/Managers/Delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            // console.log('succses to Edit');

            const data=await response.json();
            return data;
        }
        else {
            alert("deleteLogin")
            throw new Error("failed to fetch");
        }
    }
)