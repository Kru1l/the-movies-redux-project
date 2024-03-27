import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {ErrorPage, MovieDetailsPage, MoviesPage, TvShowDetailsPage, TvShowsPage, WatchListPage} from "./pages";

let router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [
            {
                index: true, element: <Navigate to={'movies'}/>
            },
            {
                path: 'movies/:title?', element: <MoviesPage/>
            },
            {
                path: 'tv-shows/:title?', element: <TvShowsPage/>
            },
            {
                path: 'movie/:id', element: <MovieDetailsPage/>
            },
            {
                path: 'tv-show/:id', element: <TvShowDetailsPage/>
            },
            {
                path: 'profile/watch-list', element: <WatchListPage/>
            }
        ]
    }
]);

export {router};