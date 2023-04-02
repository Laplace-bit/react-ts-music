import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type SongListState } from "./types/songsType";

interface SongList {
    list: SongListState[],
    listType: string,
    songCount?: number,
    searchParams?: {
        keywords: string,
        limit: number,
        offset: number
    }
}
const initialSongList: SongList = {
    list: [],
    listType: "newSong",
    songCount: 10,
    searchParams: {
        keywords: "",
        limit: 10,
        offset: 0,
    }
}

const songlistSlice = createSlice({
    name: "songlist",
    initialState: initialSongList,
    reducers: {
        loadSongList(state, actions: PayloadAction<SongList>) {
            state.list.push(...actions.payload.list);
            state.listType = actions.payload.listType;
            state.songCount = actions.payload.songCount;
            state.searchParams = actions.payload.searchParams;
        },
        resetList(state) {
            state.list = [];
            state.listType = "";
        },
    }
})

export const { loadSongList, resetList } = songlistSlice.actions;

export default songlistSlice.reducer;