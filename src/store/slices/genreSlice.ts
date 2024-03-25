import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IGenre, IGenreData} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";

interface IState {
    genres: IGenre[],
    genresMvIds: number[],
    genresTvIds: number[],
    trigger: boolean
    // checked: boolean
}

const initialState: IState = {
    genres: [],
    // checked: false,
    genresMvIds: /*JSON.parse(localStorage.getItem('genresIds')) ||*/ [],
    genresTvIds: [],
    trigger: null
};

const getMovieGenres = createAsyncThunk<IGenreData, void>(
    'genreSlice/getMovieGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.movie.getAll();
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getTvShowsGenres = createAsyncThunk<IGenreData, void>(
    'genreSlice/getTvShowsGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.tv.getAll();
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {
        setGenresMvIds: (state, action) => {
            state.genresMvIds = [...state.genresMvIds, action.payload];
            // localStorage.setItem('genresIds', JSON.stringify(state.genresIds));
        },
        setGenresTvIds: (state, action) => {
            state.genresTvIds = [...state.genresTvIds, action.payload];
        },
        deleteGenresMvIds: state => {
            state.genresMvIds = [];
            // localStorage.setItem('genresIds', JSON.stringify([]));
        },
        deleteGenresTvIds: state => {
            state.genresTvIds = [];
        },
        deleteGenresMvId: (state, action) => {
            state.genresMvIds = state.genresMvIds.filter(id => id !== action.payload);
            // localStorage.setItem('genresIds', JSON.stringify(state.genresIds));
        },
        deleteGenresTvId: (state, action) => {
            state.genresTvIds = state.genresTvIds.filter(id => id !== action.payload);
        },
        changeTrigger: state => {
            state.trigger = !state.trigger;
        }
    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(getMovieGenres, getTvShowsGenres), (state, action) => {
                state.genres = action.payload.genres;
            })
});

const {reducer: genreReducer, actions} = genreSlice;

const genreActions = {
    ...actions,
    getMovieGenres,
    getTvShowsGenres
};

export {
    genreReducer,
    genreActions
};