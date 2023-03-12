import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SongState {
    id: number,

}

const initialSong: SongState = {
    id: 11111
}

const songSlice = createSlice({
    name: 'song',
    initialState: initialSong,
    reducers: {
        songChange(state, actions: PayloadAction<number>) {
            state.id = actions.payload;
        }
    }
})

export const { songChange } = songSlice.actions;

export default songSlice.reducer;