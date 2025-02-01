import {ChangeEvent, FC, memo} from "react";
import {useSearchParams} from "react-router-dom";
import './Pagination.scss';
import {MainButton} from "../UI/main-button/MainButton.tsx";

type Props = {
    totalItems: number;
}

export const Pagination: FC<Props> = memo(({ totalItems }) => {
    const [searchParams, setSearchParams] = useSearchParams({ page: '1', limit: '20'});
    const currPage = searchParams.get('page') || '1';
    const usersPerPage = searchParams.get('limit') || '20';

    const handlePrevPage = () => {
        const prevPage = +currPage > 1 ? (+currPage - 1) : +currPage;
        setSearchParams(prev => {
            prev.set('page', prevPage.toString());
            return prev}
        );
    };

    const handleNextPage = () => {
        const nextPage = totalItems > +currPage * +usersPerPage ? (+currPage + 1) : +currPage;
        setSearchParams(prev => {
            prev.set('page', nextPage.toString());
            return prev}
        );
    };

    const handlePerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchParams(prev => {
            prev.set('limit', String(event.target.value));
            prev.set('page', '1');
            return prev
        });
    };

    return (
        <div className='pagination'>
            <div className='pages-wrapper'>
                <p className='pages-number'>Page №{currPage}</p>
                <label htmlFor='perPage'>
                    <span>items per page: </span>
                    <input
                        min='1'
                        max={totalItems}
                        className='per-page-input'
                        type="number"
                        id='perPage'
                        value={usersPerPage}
                        onChange={handlePerPage}
                    />
                </label>
            </div>

            <div className='buttons-wrapper'>
                <MainButton buttonText={`<< Prev ${usersPerPage}`} buttonOnclick={handlePrevPage} />
                <MainButton buttonText={`Next ${usersPerPage} >>`} buttonOnclick={handleNextPage} />
            </div>
        </div>
    );
});