import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({

    name: 'user',

    initialState: {
        profile: [],
        friends: [],
        isLoading: false,
        userStatus: ''
    },

    reducers: {

        onLoadingProfile: (state) => {
            state.isLoading = true;
            state.profile = [];
            state.userStatus = 'loading';
        },

        onLoadProfile: (state, { payload }) => {            
            state.profile = payload;            
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
            state.profile = payload;            
        },

        onUpdatingComplete: (state) => {
            state.isLoading = false;            
            state.userStatus = 'updated';
        },

        onLoadindFriends: (state) => {
            state.isLoading = true;
            state.friends = [];
            state.userStatus = 'loading';
        },

        onLoadFriends: (state, { payload }) => {            
            state.friends = payload;            
        },

        onLoadFriendsComplete: (state) => {
            state.isLoading = false;
            state.userStatus = 'loaded';
        },

        onError: (state, { payload }) => {
            state.isLoading = false;
            state.userStatus = payload;
        }
    }

});


export const {
    onLoadingProfile,
    onLoadProfile,
    onLoadProfileComplete,
    onUpdatingProfile,
    onUpdateProfile,
    onUpdatingComplete,
    onLoadindFriends,
    onLoadFriends,
    onLoadFriendsComplete,
    onError
} = userSlice.actions;