import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/song-slice';
import songlistSliceReducer from './features/songlist-slice';
import usersSilce from './features/users-silce';
import pollsSlice from './features/polls-slice';
import themeSlice from "./features/setting-silce"

export const store = configureStore({
    reducer: {
        songlist: songlistSliceReducer,
        song: songReducer,
        user: usersSilce,
        polls: pollsSlice,
        theme: themeSlice
    }
})

export type AppDisoptch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;