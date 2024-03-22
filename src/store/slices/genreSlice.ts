import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IGenre, IGenreData} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";

interface IState {
    genres: IGenre[],
    genresIds: number[],
    checked: boolean
}

const initialState: IState = {
    genres: [],
    checked: false,
    genresIds: JSON.parse(localStorage.getItem('genresIds')) || []
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
        setGenresIds: (state, action) => {
            state.genresIds = [...state.genresIds, action.payload];
            localStorage.setItem('genresIds', JSON.stringify(state.genresIds));
        },
        deleteGenresIds: state => {
            localStorage.setItem('genresIds', null);
            state.genresIds = [];
        },
        deleteGenresId: (state, action) => {
            state.genresIds = state.genresIds.filter(id => id !== action.payload);
            localStorage.setItem('genresIds', JSON.stringify(state.genresIds));
        },
        setChecked: state => {
            state.checked = !state.checked;
        },
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