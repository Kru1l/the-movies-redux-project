import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {movieActions} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Movie} from "../Movie/Movie";

const Movies = () => {
    const [query, setQuery] = useSearchParams({page: '1'});
    const {movies} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const page = query.get('page');

    useEffect(() => {
        dispatch(movieActions.getAll({page}));
    }, [page, dispatch]);

    return (
        <div style={{display: 'flex'}}>
            {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {Movies};