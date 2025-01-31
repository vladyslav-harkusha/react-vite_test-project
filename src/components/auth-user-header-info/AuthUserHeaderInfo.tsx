import {FC} from "react";
import './AuthUserHeaderInfo.scss';
import {useAppSelector} from "../../redux/store.ts";

export const AuthUserHeaderInfo:FC = () => {
    const { authUser } = useAppSelector(store => store.authStoreSlice);

    return (
        <div className='auth-user-info'>
            <div>
                <p className='username'>username: {authUser?.username}</p>
                <p className='user-email'>{authUser?.email}</p>
            </div>
            <div className='user-photo-wrapper'>
                <img src={authUser?.image} alt="user-photo"/>
            </div>
        </div>
    );
};