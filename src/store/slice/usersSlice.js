import { createSlice } from '@reduxjs/toolkit';
import { getLocalInvites, getLocalProfiles } from '../../helpers/localStorage';

export const usersSlice = createSlice({

    name: 'users',

    initialState: {
        invites: getLocalInvites(),
        newInvites: false,
        profiles: getLocalProfiles(),
        newProfiles: false,
        users: [],
        isLoading: false,
        userStatus: ''
    },

    reducers: {

        onNewInvites: (state, { payload }) => {
            state.newInvites = payload;
        },

        onLoadInvites: (state, { payload }) => {
            state.invites = payload;
            state.isLoading = false;
        },

        onUpdatingInvites: (state) => {
            state.isLoading = true;
        },

        onLogoutInvites: (state) => {
            state.invites = [];
        },


        onLoadUsers: (state, { payload }) => {
            state.users = payload;
            state.isLoading = false;
        },

        onLoadingUsers: (state) => {
            state.isLoading = true;
            state.users = [];
            state.userStatus = 'loading';
        },



        onNewProfiles: (state, { payload }) => {
            state.newProfiles = payload;
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


        onError: (state, { payload }) => {
            state.isLoading = false;
            state.userStatus = payload;
        }
    }

});


export const {
    onLoadUsers, onLoadingUsers,

    onLogoutInvites,
    onUpdatingInvites,
    onUpdatingComplete,
    onLoadInvites,
    onNewInvites,

    onLoadingProfile,
    onNewProfiles,
    onLoadProfile,
    onLoadProfileComplete,
    onUpdatingProfile,
    onUpdateProfile,

    onError
} = usersSlice.actions;