import {createAsyncThunk, createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {getAllEntities} from "../../services/api.service.ts";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {IUser} from "../../models/IUser.ts";
import {IUsersResponse} from "../../models/IUsersResponse.ts";

type UsersStateType = {
    users: IUser[];
    isUsersLoading: boolean;
}

const initialUsersState: UsersStateType = { users: [], isUsersLoading: false };

const loadAllUsers = createAsyncThunk('loadAllUsers', async (_, thunkAPI) => {
    try {
        const { users } = await getAllEntities<IUsersResponse>(urlEndpoints.allUsers);

        return thunkAPI.fulfillWithValue(users);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Fetch users error: ${e}`);
    }
});

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
        .addMatcher(isFulfilled(loadAllUsers), (state) => {
            state.isUsersLoading = false;
        })
        .addMatcher(isPending(loadAllUsers), (state) => {
            state.isUsersLoading = true;
        })
});

export const usersActions = { ...usersSlice.actions, loadAllUsers };