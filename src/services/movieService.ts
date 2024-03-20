import {apiService} from "./apiService";
import {urls} from "../constans";
import {IRes} from "../types";
import {IMovieData, IMovieDetails} from "../interfaces";

const movieService = {
    getAll: (page: string): IRes<IMovieData> => apiService.get(urls.movies.base, {params: {page}}),
    getById: (id: number): IRes<IMovieDetails> => apiService.get(urls.movies.byId(id)),
    getByGenreId: (page: string, id: number) => apiService.get(urls.movies.byGenreId(id), {params: {page}}),
    getPopular: (page: string): IRes<IMovieData> => apiService.get(urls.movies.popular, {params: {page}}),
    getTopRated: (page: string): IRes<IMovieData> => apiService.get(urls.movies.topRated, {params: {page}}),
    getUpcoming: (page: string): IRes<IMovieData> => apiService.get(urls.movies.upcoming, {params: {page}})
};

export {movieService};