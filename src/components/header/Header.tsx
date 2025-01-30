import {FC, useState} from "react";
import './Header.scss';
import {NavMenu} from "../nav-menu/NavMenu.tsx";
import {AuthUserHeaderInfo} from "../auth-user-header-info/AuthUserHeaderInfo.tsx";

export const Header: FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(true);

    const handleAuth = () => {
        setIsAuth(prevState => !prevState);
    };

    return (
        <header className='app-header'>
            <NavMenu isAuth={isAuth} handleAuth={handleAuth} />
            {isAuth && <AuthUserHeaderInfo />}
        </header>
    );
};