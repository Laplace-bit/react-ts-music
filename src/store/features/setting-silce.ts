import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type ThemeState } from "./types/setting"

const initialTheme: ThemeState = {
    value: 'darkAlgorithm',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialTheme,
    reducers: {
        themeChange(state, actions: PayloadAction<ThemeState>) {
            state.value = actions.payload.value;
        }
    }
})

export const { themeChange } = themeSlice.actions;

export default themeSlice.reducer;