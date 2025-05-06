import { createAsyncThunk } from '@reduxjs/toolkit'

export const addOrderThunk = createAsyncThunk(
    'addOrderThunk',
    async ({details}) => {

        const response = await fetch("https://localhost:7044/api/Order/Add",
            {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            // debugger
            //  const data = await response.json();

            // return data.orderId;

        }
        else throw new Error('failed to fetch add order');
    }
)