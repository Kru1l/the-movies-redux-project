import styles from './WatchListPage.module.css';
import {SavedMovies, SavedTvShows} from "../../components";

const WatchListPage = () => {

    return (
        <div className={styles.WatchList}>
            <SavedMovies/>
            <SavedTvShows/>
        </div>
    );
};

export {WatchListPage};