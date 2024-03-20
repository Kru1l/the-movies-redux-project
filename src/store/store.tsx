import {configureStore} from "@reduxjs/toolkit";

import {movieReducer} from "./slices";

let store = configureStore({
    reducer: {
        movies: movieReducer
    }
});

export {store};