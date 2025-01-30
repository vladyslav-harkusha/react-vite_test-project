import {FC, useEffect} from "react";
import './RecipesList.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {RecipeItem} from "../recipe-item/RecipeItem.tsx";
import {recipesActions} from "../../redux/slices/recipesSlice.ts";
import {Loader} from "../UI/loader/Loader.tsx";

export const RecipesList: FC = () => {
    const { recipes, isRecipesLoading } = useAppSelector(store => store.recipesStoreSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesActions.loadAllRecipes());
    }, []);

    return (
        <ul>
            <h3>Recipes:</h3>
            {isRecipesLoading
                ? <Loader />
                : recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
        </ul>
    );
};