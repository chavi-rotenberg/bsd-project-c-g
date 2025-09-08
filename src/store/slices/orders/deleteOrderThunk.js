import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteOrderThunk = createAsyncThunk(
    'deleteOrderThunk',
    async ( orderId ) => {

        const response = await fetch(`https://localhost:7044/api/Order/Delete/${orderId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            const data=response.json();

            console.log('succses to Edit');
            return data;
        }
        else {
            alert("deleteLogin")
            throw new Error("failed to fetch");
        }
    }
)