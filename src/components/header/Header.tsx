import {FC} from "react";
import './Header.scss';
import {NavMenu} from "../nav-menu/NavMenu.tsx";
import {AuthUserHeaderInfo} from "../auth-user-header-info/AuthUserHeaderInfo.tsx";
import {useAppSelector} from "../../redux/store.ts";

export const Header: FC = () => {
    const { authUser } = useAppSelector(store => store.authStoreSlice);

    return (
        <header className='app-header'>
            <NavMenu />
            {authUser && <AuthUserHeaderInfo />}
        </header>
    );
};