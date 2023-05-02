import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slice/usersSlice';
import { authSlice } from './slice/authSlice';
import { socketSlice } from './slice/socketSlice';


export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,
        socket: socketSlice.reducer
    }
});