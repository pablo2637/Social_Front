import { createSlice } from '@reduxjs/toolkit';
import { getLocal } from '../../helpers/localStorage';


export const userSlice = createSlice({

    name: 'user',

    initialState: {
        user: getLocal().user,
        status: getLocal().status,
        isChecking: false,
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

        onLogoutUser: (state) => {
            state.user = {};
            state.status = 'not-authenticated';
        },

        onError: (state) => {
            state.isChecking = false;
            state.user = {};
            state.status = 'not-authenticated';
        }
    }

});


export const { onCheckingUser, onLoginUser, onLogoutUser, onError } = userSlice.actions;