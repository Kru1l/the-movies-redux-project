import {createSlice} from "@reduxjs/toolkit";

interface IState {
    // genresIds: number[]
}

const initialState: IState = {
    // genresIds: JSON.parse(localStorage.getItem('genresIds')) || null
};
const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {}
});

const {reducer: filterReducer, actions} = filterSlice;

const filterActions = {
    ...actions
};

export {
    filterReducer,
    filterActions
};