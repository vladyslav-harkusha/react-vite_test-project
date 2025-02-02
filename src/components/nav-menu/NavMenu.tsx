import {FC} from "react";
import './NavMenu.scss';
import {NavLink} from "react-router-dom";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {useAppSelector} from "../../redux/store.ts";

export const NavMenu: FC = () => {
    const { authUser } = useAppSelector(state => state.authStoreSlice);
    const { authPage, home, allUsers, allRecipes } = urlEndpoints;

    const activeLinkStyles = ({ isActive }: {isActive: boolean}) => "link " + (isActive ? "is-active-link" : "");

    return (
        <nav className='nav-menu'>
            <ul className='links-list'>
                <li><NavLink className={activeLinkStyles} to={authPage} >Auth page</NavLink></li>
                <li><NavLink className={activeLinkStyles} to={home}>Home</NavLink></li>
                {authUser &&
                    <>
                        <li><NavLink className={activeLinkStyles} to={allUsers}>Users</NavLink></li>
                        <li><NavLink className={activeLinkStyles} to={allRecipes}>Recipes</NavLink></li>
                    </>
                }
            </ul>
        </nav>
    );
};