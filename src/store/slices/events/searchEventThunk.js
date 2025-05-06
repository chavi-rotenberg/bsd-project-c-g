
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchEventThunk = createAsyncThunk(

    'searchEventThunk',

    async ({ eventId, date, text }) => {

        // let fetchURL = `http://localhost:1234/event/${eventId}/search?`;
        let fetchURL=`https://localhost:7044/Tasks/Search/${eventId}`

        if (date) {
            const datte = new Date(date);
            fetchURL = fetchURL + `date=${datte.toLocaleDateString()}`;
        }

        if (text) {
            if (fetchURL.includes("date")) {
                fetchURL = fetchURL + `&`;
            }
            fetchURL = fetchURL + `text=${text}`;
        }

        const response = await fetch(fetchURL);

        if (response.ok) {
            const data = await response.json();

            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
);

