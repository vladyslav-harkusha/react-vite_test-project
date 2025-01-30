import {FC} from "react";
import './NavMenu.scss';
import {Link} from "react-router-dom";
import {urlEndpoints} from "../../router/urlEndpoints.ts";

type Props = {
    isAuth: boolean;
    handleAuth: () => void;
}

export const NavMenu: FC<Props> = ({ isAuth, handleAuth }) => {
    const { auth, home, users, recipes } = urlEndpoints;

    return (
        <nav className='nav-menu'>
            <ul className='links-list'>
                <li><Link className='link' to={isAuth ? home : auth} onClick={handleAuth}>{isAuth ? 'Log out' : 'Log in'}</Link></li>
                <li><Link className='link' to={home}>Home</Link></li>
                {isAuth &&
                    <>
                        <li><Link className='link' to={users}>Users</Link></li>
                        <li><Link className='link' to={recipes}>Recipes</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
};