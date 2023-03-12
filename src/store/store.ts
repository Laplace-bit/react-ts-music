import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/song-slice';

export const store =  configureStore({
    reducer: {
        song:songReducer
    }
})

export type AppDisoatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;