import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteCustomerThunk = createAsyncThunk(
    'deleteCustomerThunk',
    async ( id ) => {

        const response = await fetch(`https://localhost:7044/api/Customers/Delete/${id}`,
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