import {FC} from "react";
import './AuthUserHeaderInfo.scss';

export const AuthUserHeaderInfo:FC = () => {
    return (
        <div className='auth-user-info'>
            <div>
                <p className='user-firstname'>UserName</p>
                <p className='user-lastname'>UserLastName</p>
            </div>
            <div className='user-photo-wrapper'>
                <img src="https://dummyjson.com/icon/elijahs/128" alt="user-photo"/>
            </div>
        </div>
    );
};