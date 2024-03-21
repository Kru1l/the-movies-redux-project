import {configureStore} from "@reduxjs/toolkit";

import {movieReducer, tvReducer} from "./slices";

let store = configureStore({
    reducer: {
        movies: movieReducer,
        tvShows: tvReducer
    }
});

export {store};