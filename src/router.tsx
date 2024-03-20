import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "./layouts";
import {MoviesPage, TvShowsPage} from "./pages";

let router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                path: 'movies', element: <MoviesPage/>
            },
            {
                path: 'tv-shows', element: <TvShowsPage/>
            },
        ]
    }

]);

export {router};