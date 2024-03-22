import {configureStore} from "@reduxjs/toolkit";

import {genreReducer, movieReducer, tvReducer} from "./slices";

let store = configureStore({
    reducer: {
        movies: movieReducer,
        tvShows: tvReducer,
        genres: genreReducer,

    }
});

export {store};