import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {FormGroup} from "@mui/material";

import {Genre} from "../Genre/Genre";
import {genreActions} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../hooks";

const Genres = () => {
    const {genres} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    useEffect(() => {
        if (pathname.includes('/movies')) {
            dispatch(genreActions.getMovieGenres());
        } else {
            dispatch(genreActions.getTvShowsGenres());
        }
    }, [pathname, dispatch]);

    return (
        <FormGroup>
            {genres.map(genre => <Genre key={genre.id} genre={genre}/>)}
        </FormGroup>
    );
};

export {Genres};