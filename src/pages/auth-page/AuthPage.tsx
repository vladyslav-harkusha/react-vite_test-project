import {FC} from "react";
import './AuthPage.scss';
import {AuthForm} from "../../components/auth-form/AuthForm.tsx";

export const AuthPage: FC = () => {
    return (
        <div className='auth-page'>
            <h2 className='title'>Auth page</h2>
            <AuthForm />
        </div>
    );
};