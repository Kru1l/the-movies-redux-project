import {apiService} from "./apiService";
import {urls} from "../constans";
import {IRes} from "../types";
import {IGenreData} from "../interfaces";

const genreService = {
    movie: {
        getAll: (): IRes<IGenreData> => apiService.get(urls.genre.movies),
    },
    tv: {
        getAll: (): IRes<IGenreData> => apiService.get(urls.genre.tv),
    }
};

export {genreService};