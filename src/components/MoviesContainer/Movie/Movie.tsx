import {FC, SyntheticEvent} from 'react';

import styles from '../../../styles/movies-Tvs.module.css';
import {posterURL} from "../../../constans";
import {IMovie} from "../../../interfaces";
import altImg from '../../../styles/images/alt-img.png';
import {useLocation, useNavigate} from "react-router-dom";


interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
        if (e.currentTarget.src !== altImg) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = altImg;
        }
    };

    const toDetails = (): void => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className={styles.Card} onClick={toDetails}>
            <img src={`${posterURL}${poster_path}`} alt={title} onError={handleImageError}/>
            <p>{title}</p>
        </div>
    );
};

export {Movie};
