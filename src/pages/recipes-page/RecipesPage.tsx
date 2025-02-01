import {FC} from "react";
import './RecipesPage.scss';
import {RecipesList} from "../../components/recipes-list/RecipesList.tsx";
import {Pagination} from "../../components/pagination/Pagination.tsx";



export const RecipesPage: FC = () => {
    const totalRecipesCount = 50;

    return (
        <div className='recipes-page'>
            <h2 className='recipes-page-title'>Recipes page</h2>
            <RecipesList />
            <Pagination totalItems={totalRecipesCount} />
        </div>
    );
};