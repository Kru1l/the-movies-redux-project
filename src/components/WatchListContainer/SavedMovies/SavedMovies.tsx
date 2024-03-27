import styles from '../../../styles/movies-Tvs.module.css';
import {useAppSelector} from "../../../hooks";
import {SavedMovie} from "./SavedMovie";

const SavedMovies = () => {
    const {savedMovies} = useAppSelector(state => state.watchList);
    const {isDarkMode} = useAppSelector(state => state.theme);

    return (
        <div className={`${styles.Wrap} ${styles.saved} ${isDarkMode && styles.dark}`}>
            <h2>Saved Movies</h2>

            <div className={styles.cardsList}>
                {savedMovies.map(movie => <SavedMovie key={movie.id} movie={movie}/>)}
            </div>
        </div>
    );
};

export {SavedMovies};