import {configureStore} from "@reduxjs/toolkit";

import {genreReducer, loadingReducer, movieReducer, themeReducer, tvReducer, watchListReducer} from "./slices";

let store = configureStore({
    reducer: {
        movies: movieReducer,
        tvShows: tvReducer,
        genres: genreReducer,
        theme: themeReducer,
        loading: loadingReducer,
        watchList: watchListReducer
    }
});

export {store};