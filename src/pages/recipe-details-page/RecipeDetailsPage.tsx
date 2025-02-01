import {FC} from "react";
import './RecipeDetailsPage.scss';
import {RecipeDetails} from "../../components/recipe-details/RecipeDetails.tsx";

export const RecipeDetailsPage: FC = () => {
    return (
        <div className='recipe-details-page'>
            <h2 className='recipe-details-page-title'>Recipe details page</h2>
            <RecipeDetails/>
        </div>
    );
};