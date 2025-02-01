import {createAsyncThunk, createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {getEntitiesBySearchParams, getEntityById, urlParamsType} from "../../services/api.service.ts";
import {IRecipesResponse} from "../../models/IRecipesResponse.ts";
import {IRecipe} from "../../models/IRecipe.ts";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";

type RecipesStateType = {
    recipes: IRecipe[];
    isRecipesLoading: boolean;
    currentRecipe: IRecipe | null;
}

const initialRecipesState: RecipesStateType = { recipes: [], isRecipesLoading: false, currentRecipe: null };

const loadAllRecipes = createAsyncThunk('loadAllRecipes', async (params: urlParamsType, thunkAPI) => {
    try {
        const { recipes } = await getEntitiesBySearchParams<IRecipesResponse>(params);

        return thunkAPI.fulfillWithValue(recipes);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Fetch recipes error: ${e}`);
    }
});

const loadRecipeById = createAsyncThunk('loadRecipeById', async(recipeId: string, thunkAPI) => {
    try {
        const currentRecipe = await getEntityById<IRecipe>(urlEndpoints.allRecipes, recipeId);

        return thunkAPI.fulfillWithValue(currentRecipe);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Fetch user error: ${e}`);
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
        .addCase(loadRecipeById.fulfilled, (state, action: PayloadAction<IRecipe>) => {
            state.currentRecipe = action.payload;
        })
        .addCase(loadRecipeById.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
        .addMatcher(isFulfilled(loadAllRecipes, loadRecipeById), (state) => {
            state.isRecipesLoading = false;
        })
        .addMatcher(isPending(loadAllRecipes, loadRecipeById), (state) => {
            state.isRecipesLoading = true;
        })
});

export const recipesActions = { ...recipesSlice.actions, loadAllRecipes, loadRecipeById };