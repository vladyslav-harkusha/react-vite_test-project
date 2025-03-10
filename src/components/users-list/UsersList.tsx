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
        const usersSearch = searchParams.get('searchParam') || '?';
        dispatch(usersActions.loadPaginatedUsers({endpoint: urlEndpoints.allUsers, search: usersSearch, page: +currPage, limit: +usersPerPage}));
    }, [searchParams]);

    if (isUsersLoading) return <Loader />;

    return (
        <div className='users-list'>
            <p className='users-list-description'>
                {users.length ? 'click on user item to see user details' : 'no users found'}
            </p>
            <ul>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};