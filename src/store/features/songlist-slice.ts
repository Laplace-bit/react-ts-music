import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type SongListState } from "./types/songsType";

interface SongList {
    list: SongListState[]
}
const initialSongList: SongList = {
    list: []
}

const songlistSlice = createSlice({
    name: "songlist",
    initialState: initialSongList,
    reducers: {
        loadSongList(state, actions: PayloadAction<SongListState[]>) {
            state.list.push(...actions.payload);
        },
    }
})

export const { loadSongList } = songlistSlice.actions;

export default songlistSlice.reducer;