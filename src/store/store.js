import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slice/userSlice'
import { authSlice } from './slice/authSlice'

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        auth: authSlice.reducer
    },
})