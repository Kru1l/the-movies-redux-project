import {apiService} from "./apiService";
import {urls} from "../constans";

const searchService = {
    getMoviesByQuery: (page: string, title: string) => apiService.get(urls.search.movies(title), {params: {page}}),
    getTvsByQuery: (page: string, title: string) => apiService.get(urls.search.tv(title), {params: {page}}),
};

export {searchService};