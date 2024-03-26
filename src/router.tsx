import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {MovieDetailsPage, MoviesPage, TvShowDetailsPage, TvShowsPage} from "./pages";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";


let router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [
            {
                index: true, element: <Navigate to={'movies'}/>
            },
            {
                path: 'movies/:title?/', element: <MoviesPage/>
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
        ]
    }

]);

export {router};