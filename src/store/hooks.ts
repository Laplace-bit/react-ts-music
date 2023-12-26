import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
    RootState, AppDisoptch
} from "./store";

export const useAppDispatch = () => useDispatch<AppDisoptch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;