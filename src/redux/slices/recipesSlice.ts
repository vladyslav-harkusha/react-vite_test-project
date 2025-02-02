import {createAsyncThunk, createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {getEntitiesByUrlParams, getEntityById, urlParamsType} from "../../services/api.service.ts";
import {IRecipesResponse} from "../../models/IRecipesResponse.ts";
import {IRecipe} from "../../models/IRecipe.ts";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";

type RecipesStateType = {
    paginatedRecipes: IRecipe[];
    isRecipesLoading: boolean;
    currentRecipe: IRecipe | null;
}

const initialRecipesState: RecipesStateType = { paginatedRecipes: [], isRecipesLoading: false, currentRecipe: null };

const loadPaginatedRecipes = createAsyncThunk('loadPaginatedRecipes', async (params: urlParamsType, thunkAPI) => {
    try {
        const { recipes } = await getEntitiesByUrlParams<IRecipesResponse>(params);

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
        .addCase(loadPaginatedRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
            state.paginatedRecipes = action.payload;
        })
        .addCase(loadPaginatedRecipes.rejected, (state, action) => {
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
        .addMatcher(isFulfilled(loadPaginatedRecipes, loadRecipeById), (state) => {
            state.isRecipesLoading = false;
        })
        .addMatcher(isPending(loadPaginatedRecipes, loadRecipeById), (state) => {
            state.isRecipesLoading = true;
        })
});

export const recipesActions = { ...recipesSlice.actions, loadPaginatedRecipes, loadRecipeById };