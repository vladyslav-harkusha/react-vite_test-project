import './AuthForm.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {authActions} from "../../redux/slices/authSlice.ts";
import {authUsersData} from "./constants/authUsersData.ts";
import {ILoginData} from "../../models/ILoginData.ts";
import {useForm} from "react-hook-form";
import {MainButton} from "../UI/main-button/MainButton.tsx";
import {IAuthFormData} from "../../models/IAuthFormData.ts";
import {ChangeEvent} from "react";
import {Loader} from "../UI/loader/Loader.tsx";
import {joiResolver} from "@hookform/resolvers/joi";
import {authFormValidator} from "../validators/authForm.validator.ts";

export const AuthForm = () => {
    const {
        handleSubmit, register, reset, formState: { errors, isValid }, setValue
    } = useForm<IAuthFormData>({
        mode: "all",
        resolver: joiResolver(authFormValidator),
    });

    const { isAuthUserLoading, isAuthError } = useAppSelector(store => store.authStoreSlice)
    const dispatch = useAppDispatch();

    const handleSubmitCallback = (formData: ILoginData) => {
        if (!isValid) return;

        dispatch(authActions.logInUser(formData));
        reset();
    };

    const handleOnChangeInputs = () => {
        dispatch(authActions.handleIsAuthError(false));
    };

    const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const chosenUser = authUsersData.find(user => user.nameOfUser === e.target.value);

        if (chosenUser) {
            setValue('username', chosenUser.username);
            setValue('password', chosenUser.password);
        }

        dispatch(authActions.handleIsAuthError(false));
    };

    if(isAuthUserLoading) {
        return <Loader />
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitCallback)} className='auth-form'>
                <h4 className='title'>You can enter username and password manually or choose user in selection menu</h4>

                <div className='form-wrapper'>
                    <div className='inputs-wrapper'>
                        <label>
                            <p>username: </p>
                            {errors.username && <span className='input-error-message'>{errors.username.message}</span>}
                            <input type="text" {...register('username', {onChange: handleOnChangeInputs})} />
                        </label>

                        <label>
                            <p>password: </p>
                            {errors.password && <span className='input-error-message'>{errors.password.message}</span>}
                            <input type="text" {...register('password', {onChange: handleOnChangeInputs})} />
                        </label>

                        {isAuthError && <p className='auth-error-message'>Your username or password is incorrect</p>}
                    </div>

                    <label className='select-label'>
                        <p>Choose user</p>
                        <select {...register('usersSelect', {
                            onChange: handleOnChangeSelect,
                        })}>
                            {authUsersData.map(user => (
                                <option key={user.nameOfUser}>{user.nameOfUser}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <MainButton buttonText='Log in' isDisabled={!isValid} />

            </form>
        </>
    );
};