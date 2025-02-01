import {FC} from "react";
import {Header} from "../../components/header/Header.tsx";
import {Outlet} from "react-router-dom";
import './MainLayout.scss';

export const MainLayout: FC = () => {
    return (
        <div className='app-wrapper'>
            <Header />
            <Outlet />
        </div>
    );
};