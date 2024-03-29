import {FC, SyntheticEvent} from 'react';
import {useNavigate} from "react-router-dom";

import styles from '../../../styles/movies-Tvs.module.css';
import altImg from '../../../styles/images/alt-img.png';
import {posterURL} from "../../../constans";
import {IMovie} from "../../../interfaces";
import {useAppSelector} from "../../../hooks";

interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;

    const {isDarkMode} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
        if (e.currentTarget.src !== altImg) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = altImg;
        }
    };

    return (
        <div className={`${styles.Card} ${isDarkMode && styles.darkCard}`} onClick={() => navigate(`/movie/${id}`)}>
            <img src={`${posterURL}${poster_path}`} alt={title} onError={handleImageError}/>
            <p>{title}</p>
        </div>
    );
};

export {Movie};
