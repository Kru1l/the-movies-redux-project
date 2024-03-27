import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IMovieDetails, ITvShowDetails} from "../../interfaces";

interface IState {
    savedMovies: IMovieDetails[],
    savedTvShows: ITvShowDetails[],
    checkedWatchMovie: { [key: string]: boolean },
    checkedWatchTvShow: { [key: string]: boolean },
}

const initialState: IState = {
    savedMovies: JSON.parse(localStorage.getItem('savedMovies')) || [],
    savedTvShows: JSON.parse(localStorage.getItem('savedTvShows')) || [],
    checkedWatchMovie: JSON.parse(localStorage.getItem('checkedWatchMovie')) || {},
    checkedWatchTvShow: JSON.parse(localStorage.getItem('checkedWatchTvShow')) || {},
};

const watchListSlice = createSlice({
    name: 'watchListSlice',
    initialState,
    reducers: {
        addMovieToList: (state, action: PayloadAction<{ movieDetails: IMovieDetails }>) => {
            state.savedMovies = [...state.savedMovies, action.payload.movieDetails];
            localStorage.setItem('savedMovies', JSON.stringify(state.savedMovies));
        },
        addTvToList: (state, action: PayloadAction<{ tvShowDetails: ITvShowDetails }>) => {
            state.savedTvShows = [...state.savedTvShows, action.payload.tvShowDetails];
            localStorage.setItem('savedTvShows', JSON.stringify(state.savedTvShows));
        },
        deleteMovieFromList: (state, action: PayloadAction<{ movieDetails: IMovieDetails }>) => {
            const {movieDetails} = action.payload;
            state.savedMovies = state.savedMovies.filter(movie => movie.id !== movieDetails.id);
            localStorage.setItem('savedMovies', JSON.stringify(state.savedMovies));
        },
        deleteTvFromList: (state, action: PayloadAction<{ tvShowDetails: ITvShowDetails }>) => {
            const {tvShowDetails} = action.payload;
            state.savedTvShows = state.savedTvShows.filter(tv => tv.id !== tvShowDetails.id);
            localStorage.setItem('savedTvShows', JSON.stringify(state.savedTvShows));
        },
        setCheckedWatchMovie: (state, action: PayloadAction<{ title: string; checkedWatchMovie: boolean }>) => {
            const {title, checkedWatchMovie} = action.payload;
            state.checkedWatchMovie[title] = checkedWatchMovie;
            localStorage.setItem('checkedWatchMovie', JSON.stringify(state.checkedWatchMovie));
        },
        setCheckedWatchTvShow: (state, action: PayloadAction<{ name: string; checkedWatchTvShow: boolean }>) => {
            const {name, checkedWatchTvShow} = action.payload;
            state.checkedWatchTvShow[name] = checkedWatchTvShow;
            localStorage.setItem('checkedWatchTvShow', JSON.stringify(state.checkedWatchTvShow));
        },
    }
});

const {reducer: watchListReducer, actions} = watchListSlice;

const watchListActions = {
    ...actions
};

export {
    watchListReducer,
    watchListActions
};