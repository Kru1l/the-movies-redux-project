import {createSlice} from "@reduxjs/toolkit";

interface IState {
    isDarkMode: boolean,
    theme: object
}

const initialState: IState = {
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false,
    theme: {}
};
const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setIsDarkMode: state => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
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