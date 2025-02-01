import {FC} from "react";
import './UserDetailsPage.scss';
import {UserDetails} from "../../components/user-details/UserDetails.tsx";

export const UserDetailsPage: FC = () => {
    return (
        <div className='user-details-page'>
            <h2 className='user-details-page-title'>User details page</h2>
            <UserDetails />
        </div>
    );
};