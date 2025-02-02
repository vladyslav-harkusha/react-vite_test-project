import {FC, useEffect} from "react";
import './RecipeDetails.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {Loader} from "../UI/loader/Loader.tsx";
import {recipesActions} from "../../redux/slices/recipesSlice.ts";
import {Link, useParams} from "react-router-dom";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";

export const RecipeDetails: FC = () => {
    const { currentRecipe, isRecipesLoading } = useAppSelector(state => state.recipesStoreSlice);
    const dispatch = useAppDispatch();
    const { recipeId } = useParams();

    useEffect(() => {
        if(recipeId) dispatch(recipesActions.loadRecipeById(recipeId));
    }, []);

    if (isRecipesLoading) return <Loader />;
    if (!currentRecipe) return <h2>recipe is not found</h2>
    const { name, userId, id, image, ingredients, instructions } = currentRecipe;

    return (
        <div className='recipe-details'>
            <h3 className='title'>recipe №{id}: {name}</h3>
            <div className='wrapper'>
                <img className='image' src={image} alt={name}/>
                <div className='instructions'>
                    <ul className='ingredients-list'>
                        <p>ingredients:</p>
                        {ingredients.map((ingredient, id) => (
                            <li key={ingredient} className='ingredient-item'>{id + 1}: {ingredient}</li>
                        ))}
                    </ul>

                    <ul className='instructions-list'>
                        <p>instructions:</p>
                        {instructions.map((instruction, id) => (
                            <li key={instruction} className='instruction-item'>{id + 1}: {instruction}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <Link to={`${urlEndpoints.allUsers}/${userId}`} className='link-to-author'>Go to recipe author page {`>>`}</Link>
        </div>
    );
};