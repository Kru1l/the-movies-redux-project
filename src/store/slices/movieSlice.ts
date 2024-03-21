import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";

import {IMovie, IMovieData} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovie[],
    total_pages: number
}

const initialState: IState = {
    movies: [],
    total_pages: 0
};

const getAll = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getByGenreId = createAsyncThunk<IMovieData, { page: string, id: number }>(
    'movieSlice/getByGenreId',
    async ({page, id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getByGenreId(page, id);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const search = createAsyncThunk<IMovieData, { page: string, title: string }>(
    'movieSlice/search',
    async ({page, title}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.search(page, title);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(getAll, getByGenreId, search), (state, action) => {
                const {results, total_pages} = action.payload;
                state.movies = results;
                state.total_pages = total_pages;
            })
});

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    getByGenreId,
    search,

};

export {
    movieReducer,
    movieActions
};