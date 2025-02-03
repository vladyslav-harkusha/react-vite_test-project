import {FC} from "react";
import './SearchComponent.scss';
import {MainButton} from "../UI/main-button/MainButton.tsx";
import {useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";

type SearchFormProps = {
    searchField: string;
}

type SearchComponentProps = {
    urlEndpoint: string;
}

export const SearchComponent: FC<SearchComponentProps> = ({ urlEndpoint }) => {
    const { handleSubmit, register, getValues, reset } = useForm<SearchFormProps>();
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    const handleSubmitCallback = () => {
        const { searchField } = getValues();

        if (!isNaN(+searchField)) {
            navigate(`${urlEndpoint}/${searchField}`)
        } else {
            setSearchParams(prev => {
                prev.set('searchParam', `/search?q=${searchField}&`);
                prev.set('page', '1');
                return prev;
            });
        }

        reset();
    };

    return (
        <form className='search-wrapper' onSubmit={handleSubmit(handleSubmitCallback)}>
            <label>
                <p className='search-label'>Search: <span>you can search by id(number) or by name(string)</span></p>
                <input type="text" className='app-search' { ...register('searchField') } />
            </label>
            <MainButton buttonText='Search' />
        </form>
    );
};