import {FC} from "react";
import './NavMenu.scss';
import {Link} from "react-router-dom";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {useAppSelector} from "../../redux/store.ts";

export const NavMenu: FC = () => {
    const { authUser } = useAppSelector(state => state.authStoreSlice);
    const { auth, home, allUsers, allRecipes } = urlEndpoints;

    return (
        <nav className='nav-menu'>
            <ul className='links-list'>
                <li><Link className='link' to={auth} >Auth page</Link></li>
                <li><Link className='link' to={home}>Home</Link></li>
                {authUser &&
                    <>
                        <li><Link className='link' to={allUsers}>Users</Link></li>
                        <li><Link className='link' to={allRecipes}>Recipes</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
};