import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
    RootState, AppDisoatch
} from "./store";

export const useAppDispatch = () => useDispatch<AppDisoatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;