import {FC} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {urlEndpoints} from "./constans/urlEndpoints.ts";
import {MainLayout} from "../layouts/main-layout/MainLayout.tsx";
import {HomePage} from "../pages/home-page/HomePage.tsx";
import {AuthPage} from "../pages/auth-page/AuthPage.tsx";
import {UsersPage} from "../pages/users-page/UsersPage.tsx";
import {RecipesPage} from "../pages/recipes-page/RecipesPage.tsx";
import {UserDetailsPage} from "../pages/user-details-page/UserDetailsPage.tsx";
import {RecipeDetailsPage} from "../pages/recipe-details-page/RecipeDetailsPage.tsx";
import {useAppSelector} from "../redux/store.ts";

export const AppRoutes: FC = () => {
    const { authPage, home, allUsers, userById, allRecipes, recipeById } = urlEndpoints;
    const { authUser } = useAppSelector(state => state.authStoreSlice);

    console.log(authUser)
    return (
        <Routes>
            <Route path={home} element={ <MainLayout /> } >
                <Route index element={ <HomePage /> } />
                <Route path={authPage} element={ <AuthPage /> } />
                <Route path='/*' element={<Navigate to={authPage} replace />} />
                { authUser &&
                     <>
                        <Route path={allUsers} element={ <UsersPage /> } />
                        <Route path={userById} element={ <UserDetailsPage /> } />
                        <Route path={allRecipes} element={ <RecipesPage /> } />
                        <Route path={recipeById} element={ <RecipeDetailsPage /> } />
                     </>
                }
            </Route>
        </Routes>
    );
};
