import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signinFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            
        }
    }
});
// Action creators are generated for each case reducer function
export const { signinStart, signinSuccess, signinFaliure } = userSlice.actions;

export default userSlice.reducer;