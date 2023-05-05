import { createSlice } from '@reduxjs/toolkit';
import { getLocalChats } from '../../helpers/localStorage';


export const socketSlice = createSlice({

    name: 'socket',

    initialState: {
        chats: getLocalChats(),
        isReceiving: false,
        isSending: false,
        isConnecting: false,
        connState: 'disconnected'
    },

    reducers: {

        onSendMsg: (state, { payload }) => {
            state.chats[payload.ind].chat.push(payload.newMsg);
        },

        onUpdateID: (state, { payload }) => {
            console.log('update id', payload.ind, payload._id)
            state.chats[payload.ind]._id = payload._id;
        },

        onLoadChats: (state, { payload }) => {
            state.chats = payload;
        },

        onJoinChat: (state, { payload }) => {
            state.chats = payload;
            state.isSending = false;
            state.isReceiving = false;
        },

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
        },

        onReconnectLimit: (state) => {
            state.connState = 'stop'
        },

        onLogoutChat: (state) => {
            state.chats = [];
        }
    }

});


export const {
    onJoinChat,
    onLogoutChat,
    onReconnectLimit,
    onUpdateID,
    onConnected,
    onConnectError,
    onConnecting,
    onDisconnect,
    onReconnectFailed,
    onReconnectAttempt,
    onReconnect,
    onSendMsg,
    onLoadChats,
    onSending
} = socketSlice.actions;