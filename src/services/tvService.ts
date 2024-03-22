import {apiService} from "./apiService";
import {urls} from "../constans";
import {IRes} from "../types";
import {ITv, ITvData} from "../interfaces";


const tvService = {
    getAll: (page: string): IRes<ITvData> => apiService.get(urls.tv.base, {params: {page}}),
    getById: (id: number): IRes<ITv> => apiService.get(urls.tv.byId(id)),
    getByGenreId: (page: string, id: number) => apiService.get(urls.tv.byGenreId(id), {params: {page}}),
    search: (page: string, title: string): IRes<ITvData> => apiService.get(urls.tv.search(title), {params: {page}}),
    getPopular: (page: string): IRes<ITvData> => apiService.get(urls.tv.popular, {params: {page}}),
    getAiringToday: (page: string): IRes<ITvData> => apiService.get(urls.tv.airingToday, {params: {page}}),
    getOnTheAir: (page: string): IRes<ITvData> => apiService.get(urls.tv.onTheAir, {params: {page}}),
    getTopRated: (page: string): IRes<ITvData> => apiService.get(urls.tv.topRated, {params: {page}})
};

export {tvService};