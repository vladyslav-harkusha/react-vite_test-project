import {FC} from "react";
import {Routes, Route} from "react-router-dom";
import {MainTemplate} from "../templates/main-template/MainTemplate.tsx";
import {HomePage} from "../pages/home-page/HomePage.tsx";
import {AuthPage} from "../pages/auth-page/AuthPage.tsx";
import {UsersPage} from "../pages/users-page/UsersPage.tsx";
import {RecipesPage} from "../pages/recipes-page/RecipesPage.tsx";

export const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path='' element={ <MainTemplate /> } >
                <Route index element={ <HomePage /> } />
                <Route path='/auth' element={ <AuthPage /> } />
                <Route path='/auth/users' element={ <UsersPage /> } />
                <Route path='/auth/posts' element={ <RecipesPage /> } />
            </Route>
        </Routes>
    );
};

