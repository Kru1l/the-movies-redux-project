import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {MovieDetails} from "../../components";
import {movieActions} from "../../store";
import {useAppDispatch, useAppSelector} from "../../hooks";

const MovieDetailsPage = () => {
    const {movieDetails} = useAppSelector(state => state.movies);

    const dispatch = useAppDispatch();
    const state = useParams<{ id: string }>();

    useEffect(() => {
        if (state?.id) {
            dispatch(movieActions.getById({id: +state.id}));
        }
    }, [state, dispatch]);

    return (
        <div>
            {movieDetails && <MovieDetails movieDetails={movieDetails}/>}
        </div>
    );
};

export {MovieDetailsPage};