import {FC, useEffect} from "react";
import './RecipeDetails.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {Loader} from "../UI/loader/Loader.tsx";
import {recipesActions} from "../../redux/slices/recipesSlice.ts";
import {useParams} from "react-router-dom";

export const RecipeDetails: FC = () => {
    const { currentRecipe, isRecipesLoading } = useAppSelector(state => state.recipesStoreSlice);
    const dispatch = useAppDispatch();
    const { recipeId } = useParams();

    useEffect(() => {
        if(recipeId) dispatch(recipesActions.loadRecipeById(recipeId));
    }, []);

    if (isRecipesLoading) return <Loader />;
    if (!currentRecipe) return <h2>recipe is not found</h2>

    return (
        <div className='recipe-details'>
            <h3 className='recipe-name'>{currentRecipe.name}</h3>
            <img className='recipe-image' src={currentRecipe.image} alt=""/>
        </div>
    );
};