import {FC} from "react";
import './HomePage.scss';
import {Loader} from "../../components/UI/loader/Loader.tsx";
import {Link} from "react-router-dom";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
import {useAppSelector} from "../../redux/store.ts";

export const HomePage:FC = () => {
    const { authUser } = useAppSelector(state => state.authStoreSlice);

    return (
        <div className='home-page'>
            <h2 className='home-page-title'>Home page</h2>
            <p className='home-page-text'>
                This test application is created to practice <span>React</span>, <span>TypeScript</span> and <span>Redux</span>
            </p>
            <Loader />

            {!authUser &&
                <div className='need-to-login'>
                    <p>You are not authorized, log in please:</p>
                    <Link to={urlEndpoints.auth} className='link'>to Auth page</Link>
                </div>
            }
        </div>
    );
};