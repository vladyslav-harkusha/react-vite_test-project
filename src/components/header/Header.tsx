import {FC} from "react";
import './Header.scss';
import {NavMenu} from "../nav-menu/NavMenu.tsx";

export const Header: FC = () => {
    return (
        <header>
            header
            <NavMenu />
        </header>
    );
};