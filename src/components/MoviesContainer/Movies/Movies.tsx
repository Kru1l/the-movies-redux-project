import {useEffect} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import styles from '../../../styles/movies-Tvs.module.css';
import {genreActions, movieActions} from "../../../store";
import {Movie} from "../Movie/Movie";
import {PaginationAll} from "../../PaginationAll/PaginationAll";
import {useAppDispatch, useAppSelector} from "../../../hooks";

const Movies = () => {
    const {movies, total_pages, sortMv} = useAppSelector(state => state.movies);
    const {genresMvIds} = useAppSelector(state => state.genres);
    const [query] = useSearchParams({page: '1'});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {title} = useParams<{ title: string }>();
    const page = query.get('page');

    useEffect(() => {
        if (genresMvIds.length) {
            dispatch(movieActions.getByGenreIds({page, ids: genresMvIds}));
        } else if (title) {
            dispatch(movieActions.search({page, title}));
        } else {
            switch (sortMv) {
                case 'popular':
                    dispatch(movieActions.getPopular({page}));
                    break;
                case 'nowPlaying':
                    dispatch(movieActions.getNowPlaying({page}));
                    break;
                case 'topRated':
                    dispatch(movieActions.getTopRated({page}));
                    break;
                case 'upcoming':
                    dispatch(movieActions.getUpcoming({page}))
                    break;
            }
        }
    }, [page, title, sortMv, genresMvIds, dispatch]);

    // console.log(genresIds.length ? 'here nums' : 'пусто');

    const cancelFilters = () => {
        dispatch(genreActions.deleteGenresMvIds());
        navigate('/movies');
    };

    return (
        <div className={styles.Wrap}>
            <h1>Watch Movies Online</h1>
            <p>
                How many times have you sat down for the evening,
                gotten comfortable with your drink, put on your lounge pants.
                And then you discover there are no good movies to watch? For most people,
                it happens frequently. What can you do instead? How about watching a full length movie online through
                Movies? You are guaranteed to find a movie you want to watch.
            </p>

            {title ? <div className={styles.queries}>
                <div className={styles.box}>
                    <div className={styles.search}>
                        <h4>Search</h4>
                        <p>{title}</p>
                    </div>
                    <CancelIcon color={'disabled'} id={styles.cancel} fontSize={'large'} cursor={'pointer'}
                                onClick={() => navigate('/movies')}
                    />
                </div>
            </div>
:
            genresMvIds.length ? <div className={styles.queries}>
                <div className={styles.box}>
                    <div className={styles.search}>
                        <h4>Genres</h4>
                        <p>Horror</p>
                    </div>
                    <CancelIcon color={'disabled'} id={styles.cancel} fontSize={'large'} cursor={'pointer'}
                                onClick={cancelFilters}
                    />
                </div>
            </div> : null}

            <div className={styles.cardsList}>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>

            {total_pages > 1 && <PaginationAll/>}
        </div>
    );
};

export {Movies};