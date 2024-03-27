import {createSlice} from "@reduxjs/toolkit";

interface IState {
    isDarkMode: boolean,
}

const initialState: IState = {
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false,
};

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setIsDarkMode: state => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        }
    }
});

const {reducer: themeReducer, actions} = themeSlice;

const themeActions = {
    ...actions
};

export {
    themeReducer,
    themeActions
};