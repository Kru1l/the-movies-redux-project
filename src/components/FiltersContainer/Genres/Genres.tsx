import {useEffect} from "react";
import {FormGroup} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genreActions} from "../../../store";
import {Genre} from "../Genre/Genre";

const Genres = () => {
    const {genres} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getMovieGenres());
    }, []);

    return (
        <FormGroup>
            {genres.map(genre => <Genre key={genre.id} genre={genre}/>)}
        </FormGroup>
    );
};

export {Genres};