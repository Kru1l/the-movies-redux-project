import styles from "../../../styles/movies-Tvs.module.css";
import {useAppSelector} from "../../../hooks";
import {SavedTvShow} from "./SavedTvShow";

const SavedTvShows = () => {
    const {savedTvShows} = useAppSelector(state => state.watchList);
    const {isDarkMode} = useAppSelector(state => state.theme);

    return (
        <div className={`${styles.Wrap} ${styles.saved} ${isDarkMode && styles.dark}`}>
            <h2>Saved Tv-Shows</h2>

            <div className={styles.cardsList}>
                {savedTvShows.map(tv => <SavedTvShow key={tv.id} tv={tv}/>)}
            </div>
        </div>
    );
};

export {SavedTvShows};