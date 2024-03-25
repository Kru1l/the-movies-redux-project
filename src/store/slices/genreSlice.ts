import {createAsyncThunk, createSlice, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {IGenre, IGenreData} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";

interface IState {
    genres: IGenre[],
    genresMvIds: number[],
    genresTvIds: number[],
    genresMvNames: string[],
    genresTvNames: string[],
    checkedMv: { [key: string]: boolean },
    checkedTv: { [key: string]: boolean },
}

const initialState: IState = {
    genres: [],
    genresMvIds: [],
    genresTvIds: [],
    genresMvNames: [],
    genresTvNames: [],
    checkedMv: {},
    checkedTv: {},
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
        setGenresMvInfo: (state, action: PayloadAction<{ id: number, name: string }>) => {
            const {id, name} = action.payload;
            state.genresMvIds = [...state.genresMvIds, id];
            state.genresMvNames = [...state.genresMvNames, name];
        },
        setGenresTvInfo: (state, action: PayloadAction<{ id: number, name: string }>) => {
            const {id, name} = action.payload;
            state.genresTvIds = [...state.genresTvIds, id];
            state.genresTvNames = [...state.genresTvNames, name];
        },
        deleteGenresInfo: state => {
            state.genresMvIds = [];
            state.genresTvIds = [];
            state.genresMvNames = [];
            state.genresTvNames = [];
        },
        deleteGenreMv: (state, action: PayloadAction<{ id: number, name: string }>) => {
            state.genresMvIds = state.genresMvIds.filter(id => id !== action.payload.id);
            state.genresMvNames = state.genresMvNames.filter(name => name !== action.payload.name);
        },
        deleteGenreTv: (state, action: PayloadAction<{ id: number, name: string }>) => {
            state.genresTvIds = state.genresTvIds.filter(id => id !== action.payload.id);
            state.genresTvNames = state.genresTvNames.filter(name => name !== action.payload.name);
        },
        setCheckedMv: (state, action: PayloadAction<{ name: string; checkedMv: boolean }>) => {
            const {name, checkedMv} = action.payload;
            state.checkedMv[name] = checkedMv;
        },
        setCheckedTv: (state, action: PayloadAction<{ name: string; checkedTv: boolean }>) => {
            const {name, checkedTv} = action.payload;
            state.checkedTv[name] = checkedTv;
        },
        clearChecked: state => {
            state.checkedMv = {};
            state.checkedTv = {};
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