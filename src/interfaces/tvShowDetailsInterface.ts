import {IProduction_companies, IProduction_countries, ISpoken_languages} from "./movieDetailsInterface";
import {IGenre} from "./genreInterface";

interface ITvShowDetails {
    adult: boolean,
    backdrop_path: string,
    created_by: ICreated_By[],
    episode_run_time: number[],
    first_air_date: string,
    genres: IGenre[],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: ILast_Episode_To_Air
    name: string,
    next_episode_to_air: string,
    networks: INetworks[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: IProduction_companies[],
    production_countries: IProduction_countries[],
    seasons: ISeasons[],
    spoken_languages: ISpoken_languages[],
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number
}

interface ICreated_By {
    id: number,
    credit_id: string,
    name: string,
    gender: number,
    profile_path: string
}

interface ILast_Episode_To_Air {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string
}

interface INetworks {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

interface ISeasons {
    air_date: string
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    vote_average: number
}

export type {ITvShowDetails};