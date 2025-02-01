import {FC} from "react";
import './RecipeItem.scss';
import {IRecipe} from "../../models/IRecipe.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import cn from 'classnames';

type Props = {
    recipe: IRecipe;
}

export const RecipeItem: FC<Props> = ({ recipe }) => {
    const { id, name, tags } = recipe;
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleRecipeClick = () => {
        navigate(`${urlEndpoints.allRecipes}/${id}`);
    };

    const handleTagClick = (recipeTag: string) => {
        setSearchParams(prev => {
            prev.set('tagName', `/tag/${recipeTag}`);
            prev.set('page', '1');
            return prev;
        });
    };

    const hashTag = searchParams.get('tagName') || '';

    return (
        <li className='recipe-item'>
            <h4 className='recipe-name' onClick={handleRecipeClick}>{id}: {name}</h4>
            <ul className='recipe-tags-list'>
                {tags.map(tag => (
                    <li
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={cn('recipe-tag-item', {'tag--active': tag === hashTag.slice(5)})}
                    >
                        #{tag}
                    </li>
                ))}
            </ul>
        </li>
    );
};