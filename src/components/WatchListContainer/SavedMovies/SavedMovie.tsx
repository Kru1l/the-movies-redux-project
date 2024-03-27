import {FC, SyntheticEvent} from 'react';
import {useNavigate} from "react-router-dom";

import styles from "../../../styles/movies-Tvs.module.css";
import {posterURL} from "../../../constans";
import {IMovieDetails} from "../../../interfaces";
import {useAppSelector} from "../../../hooks";
import altImg from "../../../styles/images/alt-img.png";

interface IProps {
    movie: IMovieDetails
}

const SavedMovie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;

    const {isDarkMode} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
        if (event.currentTarget.src !== altImg) {
            event.currentTarget.onerror = null;
            event.currentTarget.src = altImg;
        }
    };

    return (
        <div className={`${styles.Card} ${isDarkMode && styles.darkCard}`} onClick={() => navigate(`/movie/${id}`)}>
            <img src={`${posterURL}${poster_path}`} alt={title} onError={handleImageError}/>
            <p>{title}</p>
        </div>
    );
};

export {SavedMovie};