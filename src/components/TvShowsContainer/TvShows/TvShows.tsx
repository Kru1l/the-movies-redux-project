import {useEffect} from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import styles from '../../../styles/movies-Tvs.module.css';
import {TvShow} from "../TvShow/TvShow";
import {movieActions, tvActions} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {PaginationAll} from "../../PaginationAll/PaginationAll";

const TvShows = () => {
    const {tvShows, total_pages, sortTv} = useAppSelector(state => state.tvShows);
    const [query] = useSearchParams({page: '1'});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {title} = useParams<{ title: string }>();
    const page = query.get('page');

    useEffect(() => {
        if (title) {
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
    }, [page, title, sortTv, dispatch]);

    return (
        <div className={styles.Wrap}>
            <h1>Watch TV Shows Online</h1>
            <p>
                Your life might not align with what you want the TV series broadcaster's schedule to be.
                A meeting goes late in to the night or the kids have a big game that you cannot miss.
                But there is a show you want to watch. What is a person supposed to do to watch TV shows online?
            </p>

            {title && <div className={styles.queries}>
                <div className={styles.box}>
                    <div className={styles.search}>
                        <h4>Search</h4>
                        <p>{title}</p>
                    </div>
                    <CancelIcon color={'disabled'} id={styles.cancel} fontSize={'large'} cursor={'pointer'}
                                onClick={() => navigate('/tv-shows')}
                    />
                </div>
            </div>}

            <div className={styles.cardsList}>
                {tvShows.map(tvShow => <TvShow key={tvShow.id} tvShow={tvShow}/>)}
            </div>

            {total_pages > 1 && <PaginationAll/>}
        </div>
    );
};

export {TvShows};