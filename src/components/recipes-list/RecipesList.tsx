import {FC, useEffect} from "react";
import './RecipesList.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {RecipeItem} from "../recipe-item/RecipeItem.tsx";
import {recipesActions} from "../../redux/slices/recipesSlice.ts";
import {Loader} from "../UI/loader/Loader.tsx";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {useSearchParams} from "react-router-dom";

export const RecipesList: FC = () => {
    const { paginatedRecipes, isRecipesLoading } = useAppSelector(store => store.recipesStoreSlice);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const currPage = searchParams.get('page') || '1';
        const receiptsPerPage = searchParams.get('limit') || '15';
        const chosenTag = searchParams.get('searchParam') || '?';

        dispatch(recipesActions.loadPaginatedRecipes({
            endpoint: urlEndpoints.allRecipes,
            search: chosenTag,
            page: +currPage,
            limit: +receiptsPerPage
        }));
    }, [searchParams]);

    if (isRecipesLoading) return <Loader />;

    return (
        <div className='recipes-list'>
            <p className='recipes-list-description'>
                {paginatedRecipes.length
                    ? 'click on recipe item to see recipe details / click on #hashtag to search recipes by hashtag'
                    : 'no recipes found'
                }
            </p>
            <ul>
                {paginatedRecipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
            </ul>
        </div>
    );
};