import { createSlice } from '@reduxjs/toolkit';
import { getLocalInvites, getLocalProfiles } from '../../helpers/localStorage';

export const usersSlice = createSlice({

    name: 'users',

    initialState: {
        invites: getLocalInvites(),
        profiles: getLocalProfiles(),
        isLoading: false,
        userStatus: ''
    },

    reducers: {

        onLoadInvites: (state, { payload }) => {
            state.invites = payload;
            state.isLoading = false;
        },

        onUpdatingInvites: (state) => {
            state.isLoading = true;
        },


        onLoadingProfile: (state) => {
            state.isLoading = true;
            state.profiles = [];
            state.userStatus = 'loading';
        },

        onLoadProfile: (state, { payload }) => {
            state.profiles = payload;
        },

        onLoadProfileComplete: (state) => {
            state.isLoading = false;
            state.userStatus = 'loaded';
        },

        onUpdatingProfile: (state) => {
            state.isLoading = true;
            state.userStatus = 'updating';
        },

        onUpdateProfile: (state, { payload }) => {
            state.profiles = payload;
        },

        onUpdatingComplete: (state) => {
            state.isLoading = false;
            state.userStatus = 'updated';
        },

        onLogoutInvites: (state) => {
            state.invites = [];
        },

        onError: (state, { payload }) => {
            state.isLoading = false;
            state.userStatus = payload;
        }
    }

});


export const {
    onLogoutInvites,
    onLoadingProfile,
    onLoadProfile,
    onLoadProfileComplete,
    onUpdatingProfile,
    onUpdateProfile,
    onUpdatingInvites,
    onUpdatingComplete,
    onLoadInvites,
    onError
} = usersSlice.actions;