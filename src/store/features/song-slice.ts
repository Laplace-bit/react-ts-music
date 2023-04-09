import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type SongState } from "./types/songsType"


const initialSong: SongState = {
    id: 0,
    name: "",
    singer: "",
    lyric: ""
}

const songSlice = createSlice({
    name: 'song',
    initialState: initialSong,
    reducers: {
        songChange(state, actions: PayloadAction<SongState>) {
            state.id = actions.payload.id;
            state.name = actions.payload.name;
            state.singer = actions.payload.singer;
        },
        setLyric(state, actions: PayloadAction<any>) {
            state.lyric = actions.payload.lyric;
        }
    }
})

export const { songChange, setLyric } = songSlice.actions;

export default songSlice.reducer;