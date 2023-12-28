import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: null
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error=null
        },
        signinFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
            
        },
    }
});

export const {signinStart, signinSuccess, signinFailure} = UserSlice.actions;
export default UserSlice.reducer;