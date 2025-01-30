import {FC} from "react";
import './HomePage.scss';
import {Loader} from "../../components/UI/loader/Loader.tsx";

export const HomePage:FC = () => {
    return (
        <div className='home-page'>
            <h2>Home page</h2>
            <Loader />
        </div>
    );
};