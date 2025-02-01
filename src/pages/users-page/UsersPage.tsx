import {FC} from "react";
import './UsersPage.scss';
import {UsersList} from "../../components/users-list/UsersList.tsx";
import {Pagination} from "../../components/pagination/Pagination.tsx";

export const UsersPage: FC = () => {
    const totalUsersCount = 208;

    return (
        <div className='users-page'>
            <h2 className='users-page-title'>Users list</h2>
            <UsersList />
            <Pagination totalItems={totalUsersCount} />
        </div>
    );
};