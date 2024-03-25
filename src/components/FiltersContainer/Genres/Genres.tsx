import {useEffect} from "react";
import {FormGroup} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genreActions} from "../../../store";
import {Genre} from "../Genre/Genre";
import {useLocation} from "react-router-dom";

const Genres = () => {
    const {genres, trigger} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    useEffect(() => {
        if (pathname.includes('/movies')) {
            dispatch(genreActions.getMovieGenres());
        } else {
            dispatch(genreActions.getTvShowsGenres());
        }
    }, [pathname, trigger, dispatch]);

    // console.log(trigger)

    return (
        <FormGroup>
            {genres.map(genre => <Genre key={genre.id} genre={genre}/>)}
        </FormGroup>
    );
};

export {Genres};