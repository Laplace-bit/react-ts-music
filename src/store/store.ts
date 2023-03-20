import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/song-slice';
import songlistSliceReducer from './features/songlist-slice';

export const store = configureStore({
    reducer: {
        songlist: songlistSliceReducer,
        song: songReducer,
    }
})

export type AppDisoatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;