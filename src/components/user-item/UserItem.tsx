import {FC} from "react";
import './UserItem.scss';
import {IUser} from "../../models/IUser.ts";
import {useNavigate} from "react-router-dom";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";

type Props = {
    user: IUser;
}

export const UserItem: FC<Props> = ({ user }) => {
    const { id, firstName, lastName, email } = user;
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate(`${urlEndpoints.allUsers}/${id}`);
    };

    return (
        <li className='user-item' onClick={handleUserClick}>
            <h4 className='user-name'>{id}: {firstName} {lastName}</h4>
            <span>---email: {email}</span>
        </li>
    );
};