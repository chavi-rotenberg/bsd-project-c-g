import { createAsyncThunk } from '@reduxjs/toolkit'

export const addCustomerThunk = createAsyncThunk(
    'addCustomerThunk',
    async ({details}) => {

        const response = await fetch("https://localhost:7044/api/Customers/Add",
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