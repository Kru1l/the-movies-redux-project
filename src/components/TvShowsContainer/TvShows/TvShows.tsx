import {useEffect} from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import styles from '../../../styles/movies-Tvs.module.css';
import {TvShow} from "../TvShow/TvShow";
import {genreActions, tvActions} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {PaginationAll} from "../../PaginationAll/PaginationAll";
import {LoadingPage} from "../../../pages";


const TvShows = () => {
    const {tvShows, total_pages, sortTv} = useAppSelector(state => state.tvShows);
    const {genresTvIds, genresTvNames} = useAppSelector(state => state.genres);

    const {isDarkMode} = useAppSelector(state => state.theme);
    const {isLoading} = useAppSelector(state => state.loading);

    const [query] = useSearchParams({page: '1'});
    const page = query.get('page');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {title} = useParams<{ title: string }>();

    useEffect(() => {
        if (genresTvIds.length) {
            dispatch(tvActions.getByGenreIds({page, ids: genresTvIds}));
        } else if (title) {
            dispatch(tvActions.search({page, title}));
        } else {
            switch (sortTv) {
                case 'popular':
                    dispatch(tvActions.getPopular({page}));
                    break;
                case 'airingToday':
                    dispatch(tvActions.getAiringToday({page}));
                    break;
                case 'topRated':
                    dispatch(tvActions.getTopRated({page}));
                    break;
                case 'onTheAir':
                    dispatch(tvActions.getOnTheAir({page}))
                    break;
            }
        }
    }, [page, title, sortTv, genresTvIds, dispatch]);

    const cancelFilters = (): void => {
        dispatch(genreActions.deleteGenresInfo());
        dispatch(genreActions.clearChecked());
        navigate('/tv-shows');
    };

    return (
        <div className={`${styles.Wrap} ${isDarkMode && styles.dark}`}>
            <h1>Watch TV Shows Online</h1>

            <p>
                Your life might not align with what you want the TV series broadcaster's schedule to be.
                A meeting goes late in to the night or the kids have a big game that you cannot miss.
                But there is a show you want to watch. What is a person supposed to do to watch TV shows online?
            </p>

            {isLoading && <LoadingPage/>}

            {title ? (<div className={styles.queries}>
                    <div className={styles.box}>
                        <div className={styles.search}>
                            <h4>Search</h4>
                            <p>{title}</p>
                        </div>

                        <CancelIcon color={'disabled'} id={styles.cancel} fontSize={'large'} cursor={'pointer'}
                                    onClick={() => navigate('/tv-shows')}
                        />
                    </div>
                </div>)
                :
                genresTvNames.length ? (<div className={styles.queries}>
                    <div className={styles.box}>
                        <div className={styles.search}>
                            <h4>Genres</h4>
                            <div style={{display: 'flex'}}>
                                <p>{genresTvNames.join(', ')}</p>
                            </div>
                        </div>

                        <CancelIcon color={'disabled'} id={styles.cancel} fontSize={'large'} cursor={'pointer'}
                                    onClick={cancelFilters}
                        />
                    </div>
                </div>) : null}

            <div className={styles.cardsList}>
                {tvShows.map(tvShow => <TvShow key={tvShow.id} tvShow={tvShow}/>)}
            </div>

            {total_pages > 1 && <PaginationAll/>}
        </div>
    );
};

export {TvShows};