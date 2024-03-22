import {FC, SyntheticEvent} from 'react';

import styles from '../../../styles/movies-Tvs.module.css';
import {posterURL} from "../../../constans";
import {IMovie} from "../../../interfaces";

interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;

    return (
        <div className={styles.Card}>
            <img src={`${posterURL}${poster_path}`} alt={'https://bamsibahamas.edu.bs/assets/images/default-img.png'}/>
            <p>{title}</p>
        </div>
    );
};

export {Movie};