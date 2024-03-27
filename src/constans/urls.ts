const baseURL = 'https://api.themoviedb.org/3';
const posterURL = 'https://image.tmdb.org/t/p/w200';

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWM1MTkwZTQyY2FiNzFkYTBmNTM0ODExMDU4Njk2OSIsInN1YiI6IjY1ZGYzM2NjYjM5ZTM1MDE0OTJmNDkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gSe2rjHKfJBlXpgTHbDEwH43R9MtFBMVc5rWDCdlz8U';

const discover = '/discover';
const list = '/list';

const movies = '/movie';
const tv = '/tv';
const withGenres = '?with_genres='

const popular = '/popular';
const nowPlaying = '/now_playing';
const topRated = '/top_rated';
const upcoming = '/upcoming';

const onTheAir = '/on_the_air';
const airingToday = '/airing_today'

const genre = '/genre';

const search = '/search';
const query = '?query=';

const urls = {
    movies: {
        base: discover + movies,
        byId: (id: number): string => `${movies}/${id}`,
        byGenreIds: (ids: number[]): string => `${discover + movies}${withGenres + ids}`,
        search: (title: string): string => search + movies + query + title,
        popular: movies + popular,
        nowPlaying: movies + nowPlaying,
        topRated: movies + topRated,
        upcoming: movies + upcoming
    },
    tv: {
        base: discover + tv,
        byId: (id: number): string => `${tv}/${id}`,
        byGenreIds: (ids: number[]): string => `${discover + tv}${withGenres + ids}`,
        search: (title: string): string => search + tv + query + title,
        popular: tv + popular,
        airingToday: tv + airingToday,
        topRated: tv + topRated,
        onTheAir: tv + onTheAir
    },
    genre: {
        movies: genre + movies + list,
        tv: genre + tv + list
    }
}


export {
    baseURL,
    posterURL,
    accessToken,
    urls
};