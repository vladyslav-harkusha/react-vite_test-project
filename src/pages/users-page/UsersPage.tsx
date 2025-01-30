import {FC} from "react";
import './UsersPage.scss';
import {UsersList} from "../../components/users-list/UsersList.tsx";

export const UsersPage: FC = () => {
    return (
        <>
            <h2>Users page</h2>
            <UsersList />
        </>
    );
};