import {ChangeEvent} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import {Pagination, Stack} from "@mui/material";

import {useAppSelector} from "../../hooks";

const PaginationAll = () => {
    const [query, setQuery] = useSearchParams({page: '1'});
    const {total_pages: mvTotalPages} = useAppSelector(state => state.movies);
    const {total_pages: tvTotalPages} = useAppSelector(state => state.tvShows);
    const {pathname} = useLocation();
    const page = query.get('page');


    const pageChange = (ev: ChangeEvent<unknown>, value: number): void => {
        setQuery(prev => {
            prev.set('page', `${value}`);
            return prev
        });
    };

    return (
        <Stack spacing={2} width={'60%'} sx={{justifyContent: 'center', alignItems: 'center', marginTop: '1vw'}}>
            <Pagination
                count={pathname.includes('/movies') ? (mvTotalPages < 500 ? mvTotalPages : 500) : (tvTotalPages < 500 ? tvTotalPages : 500)}
                variant="outlined" shape="rounded"
                page={page ? +page : 1}
                onChange={pageChange}
            />
        </Stack>
    );
};

export {PaginationAll};