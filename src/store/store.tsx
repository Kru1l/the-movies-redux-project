import {configureStore} from "@reduxjs/toolkit";

import {genreReducer, movieReducer, themeReducer, tvReducer} from "./slices";

let store = configureStore({
    reducer: {
        movies: movieReducer,
        tvShows: tvReducer,
        genres: genreReducer,
        theme: themeReducer
    }
});

export {store};