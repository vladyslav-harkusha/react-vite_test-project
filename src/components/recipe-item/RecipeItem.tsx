import {FC} from "react";
import './RecipeItem.scss';
import {IRecipe} from "../../models/IRecipe.ts";

type Props = {
    recipe: IRecipe;
}

export const RecipeItem: FC<Props> = ({ recipe }) => {
    const { id, name, tags } = recipe;

    return (
        <li>
            <h3>{id}: {name}</h3>
            <ul>
                <h4>Tags:</h4>
                {tags.map(tag => (
                    <li key={tag}>#{tag}</li>
                ))}
            </ul>
        </li>
    );
};