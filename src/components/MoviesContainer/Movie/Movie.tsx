import {FC, SyntheticEvent} from 'react';

import styles from '../../../styles/movies-Tvs.module.css';
import altImg from '../../../styles/images/alt-img.png';
import {posterURL} from "../../../constans";
import {IMovie} from "../../../interfaces";


interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;

    const handleError = (e: SyntheticEvent<HTMLImageElement>): void => {
        if (e.currentTarget.src !== altImg) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = altImg;
        }
    };

    return (
        <div className={styles.Card}>
            <img src={`${posterURL}${poster_path}`} alt={title} onError={handleError}/>
            <p>{title}</p>
        </div>
    );
};

export {Movie};
