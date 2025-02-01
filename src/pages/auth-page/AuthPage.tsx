import {FC} from "react";
import './AuthPage.scss';
import {AuthForm} from "../../components/auth-form/AuthForm.tsx";
import {useAppSelector} from "../../redux/store.ts";
import {LogOut} from "../../components/log-out/LogOut.tsx";

export const AuthPage: FC = () => {
    const { authUser } = useAppSelector(store => store.authStoreSlice);

    return (
        <div className='auth-page'>
            <h2 className='auth-page-title'>Auth page</h2>
            {authUser
                ? <LogOut authUser={authUser} />
                : <AuthForm />
            }
        </div>
    );
};