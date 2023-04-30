import { createSlice } from '@reduxjs/toolkit';
import { getLocal } from '../../helpers/localStorage';


export const authSlice = createSlice({

    name: 'auth',

    initialState: {
        user: getLocal().user,
        status: getLocal().status,
        isChecking: false,
        isLoading: false,
    },

    reducers: {

        onCheckingUser: (state) => {
            state.isChecking = true;
            state.user = {};
            state.status = 'checking';
        },

        onLoginUser: (state, { payload }) => {
            state.isChecking = false;
            state.user = payload;
            state.status = 'authenticated';
        },

        onLoading: (state) => {
            state.isLoading = true;
        },

        onChecking: (state) => {
            state.isChecking = true;
        },

        onUpdateUser: (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
        },

        onComplete: (state) => {
            state.isChecking = false;
        },

        onLogoutUser: (state) => {
            state.user = {};
            state.status = 'not-authenticated';
        },

        onError: (state) => {
            state.isChecking = false;
            state.isLoading = false;
            state.user = {};
            state.status = 'not-authenticated';
        }
    }

});


export const {
    onCheckingUser,
    onChecking,
    onComplete,
    onLoginUser,
    onUpdateUser,
    onLoading,
    onLogoutUser,
    onError
} = authSlice.actions;