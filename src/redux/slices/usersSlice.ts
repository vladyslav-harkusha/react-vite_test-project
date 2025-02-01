import {createAsyncThunk, createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {getEntitiesBySearchParams, getEntityById, urlParamsType} from "../../services/api.service.ts";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {IUser} from "../../models/IUser.ts";
import {IUsersResponse} from "../../models/IUsersResponse.ts";

type UsersStateType = {
    users: IUser[];
    isUsersLoading: boolean;
    currentUser: IUser | null;
}

const initialUsersState: UsersStateType = { users: [], isUsersLoading: false, currentUser: null };

const loadAllUsers = createAsyncThunk('loadAllUsers', async (urlParams: urlParamsType, thunkAPI) => {
    try {
        const { users } = await getEntitiesBySearchParams<IUsersResponse>(urlParams);

        return thunkAPI.fulfillWithValue(users);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Fetch users error: ${e}`);
    }
});

const loadUserById = createAsyncThunk('loadUserById', async(userId: string, thunkAPI) => {
    try {
        const currentUser = await getEntityById<IUser>(urlEndpoints.allUsers, userId);

        return thunkAPI.fulfillWithValue(currentUser);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Fetch user error: ${e}`);
    }
})

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: initialUsersState,
    reducers: {
        handleIsUsersLoading: (state, action: PayloadAction<boolean>) => {
            state.isUsersLoading = action.payload;
        },
    },
    extraReducers: builder => builder
        .addCase(loadAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        })
        .addCase(loadAllUsers.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
        .addCase(loadUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.currentUser = action.payload;
        })
        .addCase(loadUserById.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
        .addMatcher(isFulfilled(loadAllUsers, loadUserById), (state) => {
            state.isUsersLoading = false;
        })
        .addMatcher(isPending(loadAllUsers, loadUserById), (state) => {
            state.isUsersLoading = true;
        })
});

export const usersActions = { ...usersSlice.actions, loadAllUsers, loadUserById };