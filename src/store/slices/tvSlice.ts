import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";

import {ITv, ITvData, ITvShowDetails} from "../../interfaces";
import {tvService} from "../../services";

interface IState {
    tvShows: ITv[],
    tvShowDetails: ITvShowDetails,
    total_pages: number,
    sortTv: string
}

const initialState: IState = {
    tvShows: [],
    tvShowDetails: null,
    total_pages: 0,
    sortTv: localStorage.getItem('sortTv') || 'popular'
};

const getAll = createAsyncThunk<ITvData, { page: string }>(
    'tvSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getAll(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getById = createAsyncThunk<ITvShowDetails, { id: number }>(
    'tvSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getById(id);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getByGenreIds = createAsyncThunk<ITvData, { page: string, ids: number[] }>(
    'tvSlice/getByGenreIds',
    async ({page, ids}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getByGenreIds(page, ids);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getPopular = createAsyncThunk<ITvData, { page: string }>(
    'tvSlice/getPopular',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getPopular(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getAiringToday = createAsyncThunk<ITvData, { page: string }>(
    'tvSlice/getAiringToday',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getAiringToday(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getOnTheAir = createAsyncThunk<ITvData, { page: string }>(
    'tvSlice/getOnTheAir',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getOnTheAir(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const getTopRated = createAsyncThunk<ITvData, { page: string }>(
    'tvSlice/getTopRated',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.getTopRated(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const search = createAsyncThunk<ITvData, { page: string, title: string }>(
    'tvSlice/search',
    async ({page, title}, {rejectWithValue}) => {
        try {
            const {data} = await tvService.search(page, title);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
);

const tvSlice = createSlice({
    name: 'tvSlice',
    initialState,
    reducers: {
        setSortTv: (state, action) => {
            localStorage.setItem('sortTv', action.payload);
            state.sortTv = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.tvShowDetails = action.payload;
            })
            .addMatcher(isFulfilled(getAll, getByGenreIds, getPopular, getAiringToday, getOnTheAir, getTopRated, search), (state, action) => {
                const {results, total_pages} = action.payload;
                state.tvShows = results;
                state.total_pages = total_pages;
            })
});

const {reducer: tvReducer, actions} = tvSlice;

const tvActions = {
    ...actions,
    getAll,
    getById,
    getByGenreIds,
    getPopular,
    getAiringToday,
    getOnTheAir,
    getTopRated,
    search,

};

export {
    tvReducer,
    tvActions
};