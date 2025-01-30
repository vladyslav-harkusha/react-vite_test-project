import {FC} from "react";
import './RecipesPage.scss';
import {RecipesList} from "../../components/recipes-list/RecipesList.tsx";

export const RecipesPage: FC = () => {
    return (
        <>
            <h2>Recipes page</h2>
            <RecipesList />
        </>
    );
};