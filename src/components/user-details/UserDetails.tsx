import {FC, useEffect} from "react";
import './UserDetails.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useParams} from "react-router-dom";
import {usersActions} from "../../redux/slices/usersSlice.ts";
import {Loader} from "../UI/loader/Loader.tsx";

export const UserDetails: FC = () => {
    const { currentUser, isUsersLoading } = useAppSelector(state => state.usersStoreSlice);
    const dispatch = useAppDispatch();
    const { userId } = useParams();

    useEffect(() => {
        if (userId) dispatch(usersActions.loadUserById(userId));
    }, []);

    if (isUsersLoading) return <Loader />;
    if (!currentUser) return <h2>user is not found</h2>;

    return (
        <>
            {currentUser.firstName}
        </>
    );
};