import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: [],
    reducers: {
        addConnection : (state, action) => {
            return action.payload;
        },
        removeConnection : () => [],
    }
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;