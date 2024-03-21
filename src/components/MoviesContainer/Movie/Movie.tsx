import {FC, SyntheticEvent} from 'react';

import styles from '../../../styles/moviesTvs.module.css';
import {posterURL} from "../../../constans";
import {IMovie} from "../../../interfaces";

interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;

    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://bamsibahamas.edu.bs/assets/images/default-img.png';
    };

    return (
        <div className={styles.Card}>
            <img src={`${posterURL}${poster_path}`} alt={title} onError={handleImageError}/>
            <p>{title}</p>
        </div>
    );
};

export {Movie};