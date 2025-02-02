import {FC, useEffect, useMemo} from "react";
import './UserDetails.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useParams} from "react-router-dom";
import {usersActions} from "../../redux/slices/usersSlice.ts";
import {Loader} from "../UI/loader/Loader.tsx";
import {recipesActions} from "../../redux/slices/recipesSlice.ts";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {RecipeItem} from "../recipe-item/RecipeItem.tsx";

export const UserDetails: FC = () => {
    const { currentUser, isUsersLoading } = useAppSelector(state => state.usersStoreSlice);
    const { paginatedRecipes } = useAppSelector(state => state.recipesStoreSlice);
    const dispatch = useAppDispatch();
    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            dispatch(usersActions.loadUserById(userId));
            dispatch(recipesActions.loadPaginatedRecipes({
                endpoint: urlEndpoints.allRecipes,
                search: '',
                page: 1,
                limit: 50,
            }));
        }
    }, []);

    const recipesOfCurrentUser = useMemo(() => {
        return paginatedRecipes.filter(recipe => String(recipe.userId) === String(userId))
    }, [paginatedRecipes]);

    if (isUsersLoading) return <Loader />;
    if (!currentUser) return <h2>user is not found</h2>;
    const { id, firstName, lastName, gender, email, phone, birthDate, image } = currentUser;

    return (
        <div className='user-details'>
            <div className='info-wrapper'>
                <div className='image-wrapper'>
                    <img src={image} alt={firstName} className='user-image'/>
                </div>
                <div className='user-info'>
                    <h3 className='user-name'>user №{id}: {firstName} {lastName}</h3>
                    <p><span>Gender:</span> {gender}</p>
                    <p><span>Birh date:</span> {birthDate}</p>
                    <p><span>email:</span> {email}</p>
                    <p><span>phone:</span> {phone}</p>
                </div>
            </div>

            {!recipesOfCurrentUser.length
                ? <p className='no-recipes-info'>Current user has no own recipes</p>
                : <ul className='user-recipes'>
                    <p>Recipes of this user:</p>
                    {recipesOfCurrentUser.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />)}
                  </ul>
            }
        </div>
    );
};