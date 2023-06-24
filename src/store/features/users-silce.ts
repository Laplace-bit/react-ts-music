import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type UserState } from "./types/userType"


const initialSong: UserState = {
    loginFlag: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialSong,
    reducers: {
        userChange(state, actions: PayloadAction<UserState>) {
            state.loginFlag = actions.payload.loginFlag;
        }
    }
})

export const { userChange } = userSlice.actions;

export default userSlice.reducer;