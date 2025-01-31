import {FC} from "react";
import {Routes, Route} from "react-router-dom";
import {urlEndpoints} from "./constans/urlEndpoints.ts";
import {MainTemplate} from "../templates/main-template/MainTemplate.tsx";
import {HomePage} from "../pages/home-page/HomePage.tsx";
import {AuthPage} from "../pages/auth-page/AuthPage.tsx";
import {UsersPage} from "../pages/users-page/UsersPage.tsx";
import {RecipesPage} from "../pages/recipes-page/RecipesPage.tsx";
import {UserDetailsPage} from "../pages/user-details-page/UserDetailsPage.tsx";
import {RecipeDetailsPage} from "../pages/recipe-details-page/RecipeDetailsPage.tsx";

export const AppRoutes: FC = () => {
    const { auth, home, allUsers, userById, allRecipes, recipeById } = urlEndpoints;

    return (
        <Routes>
            <Route path={home} element={ <MainTemplate /> } >
                <Route index element={ <HomePage /> } />
                <Route path={auth} element={ <AuthPage /> } />
                <Route path={allUsers} element={ <UsersPage /> } />
                <Route path={userById} element={ <UserDetailsPage /> } />
                <Route path={allRecipes} element={ <RecipesPage /> } />
                <Route path={recipeById} element={ <RecipeDetailsPage /> } />
            </Route>
        </Routes>
    );
};

