import {FC} from "react";
import {Header} from "../../components/header/Header.tsx";
import {Outlet} from "react-router-dom";
import './MainTemplate.scss';

export const MainTemplate: FC = () => {
    return (
        <div className='app-wrapper'>
            <Header />
            <Outlet />
        </div>
    );
};