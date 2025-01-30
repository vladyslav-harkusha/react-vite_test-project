import {FC, useEffect} from "react";
import './UsersList.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {usersActions} from "../../redux/slices/usersSlice.ts";
import {UserItem} from "../user-item/UserItem.tsx";

export const UsersList: FC = () => {
    const { users } = useAppSelector(store => store.usersStoreSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersActions.loadAllUsers());
    }, []);

    return (
        <ul>
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </ul>
    );
};