import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {usersSlice} from "./slices/usersSlice.ts";
import {recipesSlice} from "./slices/recipesSlice.ts";
import {authSlice} from "./slices/authStoreSlice.ts";

export const store = configureStore({
    reducer: {
        authStoreSlice: authSlice.reducer,
        usersStoreSlice: usersSlice.reducer,
        recipesStoreSlice: recipesSlice.reducer,
    }
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();