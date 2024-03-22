import {FC, SyntheticEvent} from 'react';

import styles from '../../../styles/movies-Tvs.module.css';
import {ITv} from "../../../interfaces";
import {posterURL} from "../../../constans";

interface IProps {
    tvShow: ITv
}

const TvShow: FC<IProps> = ({tvShow}) => {
    const {id, name, poster_path} = tvShow;

    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://bamsibahamas.edu.bs/assets/images/default-img.png';
    };

    return (
        <div className={styles.Card}>
            <img src={`${posterURL}${poster_path}`} alt={name} onError={handleImageError}/>
            <p>{name}</p>
        </div>
    );
};

export {TvShow};