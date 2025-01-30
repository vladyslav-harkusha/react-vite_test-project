import {FC, useEffect} from "react";
import './UsersList.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {usersActions} from "../../redux/slices/usersSlice.ts";
import {UserItem} from "../user-item/UserItem.tsx";
import {Loader} from "../UI/loader/Loader.tsx";

export const UsersList: FC = () => {
    const { users, isUsersLoading } = useAppSelector(store => store.usersStoreSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersActions.loadAllUsers());
    }, []);

    return (
        <ul>
            {isUsersLoading
                ? <Loader />
                : users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
        </ul>
    );
};