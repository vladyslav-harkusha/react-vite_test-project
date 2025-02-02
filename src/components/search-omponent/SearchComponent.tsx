import {FC} from "react";
import './SearchComponent.scss';
import {MainButton} from "../UI/main-button/MainButton.tsx";
import {useForm} from "react-hook-form";
import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";

type SearchFormProps = {
    searchField: string;
}

type SearchComponentProps = {
    urlEndpoint: string;
}

export const SearchComponent: FC<SearchComponentProps> = ({ urlEndpoint }) => {
    const { handleSubmit, register, reset, getValues } = useForm<SearchFormProps>();
    // const dispatch = useDispatch();

    const handleSubmitCallback = () => {
        const { searchField } = getValues();

        if (urlEndpoint === urlEndpoints.allRecipes) {
            if (!isNaN(+searchField)) {

                console.log(+searchField);
            } else {


                console.log(searchField);
            }
        }

        reset();
    };

    return (
        <form className='search-wrapper' onSubmit={handleSubmit(handleSubmitCallback)}>
            <label>
                <p>Search:</p>
                <input type="text" className='app-search' { ...register('searchField') } />
            </label>
            <MainButton buttonText='Search' />
        </form>
    );
};