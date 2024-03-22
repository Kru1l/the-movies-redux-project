import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";

import {IMovie, IMovieData, IMovieDetails} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovie[],
    movieDetails: IMovieDetails,
    total_pages: number,
    sortMv: string
}

const initialState: IState = {
    movies: [],
    movieDetails: null,
    total_pages: 0,
    sortMv: localStorage.getItem('sortMv') || 'popular'
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

const getById = createAsyncThunk<IMovieDetails, { id: number }>(
    'movieSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getByGenreId = createAsyncThunk<IMovieData, { page: string, ids: number[] }>(
    'movieSlice/getByGenreId',
    async ({page, ids}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getByGenreId(page, ids);
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
);

const getPopular = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getPopular',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getPopular(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getTopRated = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getTopRated',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTopRated(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getNowPlaying = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getNowPlaying',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getNowPlaying(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getUpcoming = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getUpcoming',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getUpcoming(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setSortMv: (state, action) => {
            localStorage.setItem('sortMv', action.payload);
            state.sortMv = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.movieDetails = action.payload;
            })
            .addMatcher(isFulfilled(getAll, getByGenreId, search, getPopular, getNowPlaying, getTopRated, getUpcoming), (state, action) => {
                const {results, total_pages} = action.payload;
                state.movies = results;
                state.total_pages = total_pages;
            })
});

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    getById,
    getByGenreId,
    search,
    getPopular,
    getNowPlaying,
    getTopRated,
    getUpcoming
};

export {
    movieReducer,
    movieActions
};