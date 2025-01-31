import {createAsyncThunk, createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {getAllEntities} from "../../services/api.service.ts";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {IRecipesResponse} from "../../models/IRecipesResponse.ts";
import {IRecipe} from "../../models/IRecipe.ts";

type RecipesStateType = {
    recipes: IRecipe[];
    isRecipesLoading: boolean;
}

const initialRecipesState: RecipesStateType = { recipes: [], isRecipesLoading: false };

const loadAllRecipes = createAsyncThunk('loadAllRecipes', async (_, thunkAPI) => {
    try {
        const { recipes } = await getAllEntities<IRecipesResponse>(urlEndpoints.allRecipes);

        return thunkAPI.fulfillWithValue(recipes);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Fetch recipes error: ${e}`);
    }
});

export const recipesSlice = createSlice({
    name: 'recipesSlice',
    initialState: initialRecipesState,
    reducers: {
        handleIsRecipesLoading: (state, action: PayloadAction<boolean>) => {
            state.isRecipesLoading = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(loadAllRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
            state.recipes = action.payload;
        })
        .addCase(loadAllRecipes.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
        .addMatcher(isFulfilled(loadAllRecipes), (state) => {
            state.isRecipesLoading = false;
        })
        .addMatcher(isPending(loadAllRecipes), (state) => {
            state.isRecipesLoading = true;
        })
});

export const recipesActions = { ...recipesSlice.actions, loadAllRecipes };