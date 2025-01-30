import {FC} from "react";
import './Loader.scss';

export const Loader: FC = () => {
    return (
        <div className='loader-wrapper'>
            <div className='inner-center'></div>
            <div className='inner-elem inner-elem--one'></div>
            <div className='inner-elem inner-elem--two'></div>
            <div className='inner-elem inner-elem--three'></div>
        </div>
    );
};