import {FC, useEffect} from "react";
import './UsersList.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useSearchParams} from "react-router-dom";
import {usersActions} from "../../redux/slices/usersSlice.ts";
import {UserItem} from "../user-item/UserItem.tsx";
import {Loader} from "../UI/loader/Loader.tsx";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";

export const UsersList: FC = () => {
    const { users, isUsersLoading } = useAppSelector(store => store.usersStoreSlice);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const currPage = searchParams.get('page') || '1';
        const usersPerPage = searchParams.get('limit') || '15';
        dispatch(usersActions.loadAllUsers({endpoint: urlEndpoints.allUsers, search: '', page: +currPage, limit: +usersPerPage}));
    }, [searchParams]);

    if (isUsersLoading) return <Loader />;

    return (
        <div>
            <p className='users-list-description'>click on user item to see user details</p>
            <ul className='users-list'>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};