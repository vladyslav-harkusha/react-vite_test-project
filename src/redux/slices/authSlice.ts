import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {getLoginData} from "../../services/api.service.ts";
import {IAuthResponseWithTokens} from "../../models/IAuthResponseWithTokens.ts";
import {ILoginData} from "../../models/ILoginData.ts";

type AuthUserStateType = {
    authUser: IAuthResponseWithTokens | null;
    isAuthUserLoading: boolean;
    isAuthError: boolean;
}

const initialAuthUserState: AuthUserStateType = { authUser: null, isAuthUserLoading: false, isAuthError: false };

const logInUser = createAsyncThunk('logInUser', async (authData: ILoginData, thunkAPI) => {
    try {
        const authUser = await getLoginData(authData);

        return thunkAPI.fulfillWithValue(authUser);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Login error: ${e}`);
    }
});

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuthUserState,
    reducers: {
        handleIsAuthUserLoading: (state, action: PayloadAction<boolean>) => {
            state.isAuthUserLoading = action.payload;
        },
        logOutUser: (state) => {
            state.authUser = null;
        },
        handleIsAuthError: (state, action: PayloadAction<boolean>) => {
            state.isAuthError = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(logInUser.fulfilled, (state, action: PayloadAction<IAuthResponseWithTokens>) => {
            state.authUser = action.payload;
        })
        .addCase(logInUser.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
        .addMatcher(isFulfilled(logInUser), (state) => {
            state.isAuthUserLoading = false;
        })
        .addMatcher(isPending(logInUser), (state) => {
            state.isAuthUserLoading = true;
            state.isAuthError = false;
        })
        .addMatcher(isRejected(logInUser), (state) => {
            state.isAuthUserLoading = false;
            state.isAuthError = true;
        })
});

export const authActions = { ...authSlice.actions, logInUser, };
