import {FC, useEffect} from "react";
import './UserDetails.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useParams} from "react-router-dom";
import {usersActions} from "../../redux/slices/usersSlice.ts";

export const UserDetails: FC = () => {
    const { currentUser } = useAppSelector(state => state.usersStoreSlice);
    const dispatch = useAppDispatch();
    const { userId } = useParams();

    useEffect(() => {
        if (userId) dispatch(usersActions.loadUserById(userId));
    }, []);

    if (!currentUser) {
        return <h3>user not found</h3>
    }

    return (
        <>
            {currentUser.firstName}
        </>
    );
};