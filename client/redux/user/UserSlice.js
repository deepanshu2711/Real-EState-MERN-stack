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
        updateUserStart:(state)=>{
            state.loading =true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart:(state)=>{
            state.loading =true;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {signinStart, signinSuccess, signinFailure, updateUserStart, updateUserSuccess, updateUserFailure ,deleteUserStart,deleteUserSuccess,deleteUserFailure} = UserSlice.actions;
export default UserSlice.reducer;