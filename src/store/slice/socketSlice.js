import { createSlice } from '@reduxjs/toolkit';


export const socketSlice = createSlice({

    name: 'socket',

    initialState: {
        chats: [],
        isReceiving: false,
        isSending: false,
        isConnecting: false,
        connState: 'disconnected'
    },

    reducers: {
        onConnected: (state) => {
            state.isConnecting = false;
            state.connState = 'connected';
        },

        onConnecting: (state) => {
         
            state.isConnecting = true;
            state.connState = 'connecting';
        },

        onConnectError: (state) => {
            state.isConnecting = true;
            state.connState = 'connection error';
        },

        onSending: (state) => {
            state.isSending = true;
            state.connState = 'sending';
        },

        onReconnectAttempt: (state) => {
            state.isConnecting = true;
            state.connState = 'reconnecting'
        },

        onReconnect: (state) => {
            state.isConnecting = false;
            state.connState = 'reconnected'
        },

        onReconnectFailed: (state) => {
            state.isConnecting = false;
            state.connState = 'reconnect failed'
        },

        onDisconnect: (state) => {
            state.isConnecting = false;
            state.connState = 'disconnected'
        }
    }

});


export const {
    onConnected,
    onConnectError,
    onConnecting,
    onDisconnect,
    onReconnectFailed,
    onReconnectAttempt,
    onReconnect,
    onSending
} = socketSlice.actions;