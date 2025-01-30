import {FC} from "react";
import './UserItem.scss';
import {IUser} from "../../models/IUser.ts";

type Props = {
    user: IUser;
}

export const UserItem: FC<Props> = ({ user }) => {
    const { id, firstName, lastName } = user;

    return (
        <li>
            <h4>{id}: {firstName} {lastName}</h4>
        </li>
    );
};