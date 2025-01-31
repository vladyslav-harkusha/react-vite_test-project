import {authUsersData} from "../constants/authUsersData.ts";
import './AuthForm.scss';

export const AuthForm = () => {
    return (
        <>
            <form className='auth-form'>
                <h4>You can enter username and password manually or choose user in selection menu</h4>
                <div className='inputs-wrapper'>

                    <label>
                        <p>username: </p>
                        <input type="text"/>
                    </label>
                    <label>
                        <p>password: </p>
                        <input type="password"/>
                    </label>
                </div>

                <label className='select-label'>
                    <p>Choose user</p>
                    <select name="users-select">
                        {authUsersData.map(({nameOfUser}) => (
                            <option value={nameOfUser}>{nameOfUser}</option>
                        ))}
                    </select>
                </label>

                <button className='auth-form-submit-button'>Log in</button>
            </form>
        </>
    );
};