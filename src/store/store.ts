import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/song-slice';
import songlistSliceReducer from './features/songlist-slice';
import usersSilce from './features/users-silce';

export const store = configureStore({
    reducer: {
        songlist: songlistSliceReducer,
        song: songReducer,
        user: usersSilce,
    }
})

export type AppDisoatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;