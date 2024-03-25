import {useParams} from "react-router-dom";
import {useEffect} from "react";

import styles from './CardDetails.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions, tvActions} from "../../store";

const CardDetails = () => {
    const {movieDetails} = useAppSelector(state => state.movies);
    const {tvShowDetails} = useAppSelector(state => state.tvShows);
    const state = useParams<{ id: string, card: string }>();
    const dispatch = useAppDispatch();

    console.log(state.card)
    useEffect(() => {
        if (state?.card === 'movie') {
            dispatch(movieActions.getById({id: +state.id}));
        } else if (state?.card === 'tv-show') {
            dispatch(tvActions.getById({id: +state.id}));
        }
    }, [state]);

    return (
        <div className={styles.CardDetails}>
            {movieDetails || tvShowDetails ?
                <div>

                </div> : null}
        </div>
    );
};

export {CardDetails};