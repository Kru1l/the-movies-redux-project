import {FC, SyntheticEvent} from 'react';

import styles from '../../../styles/movies-Tvs.module.css';
import {posterURL} from "../../../constans";
import {ITv} from "../../../interfaces";
import altImg from "../../../styles/images/alt-img.png";
import {useNavigate} from "react-router-dom";

interface IProps {
    tvShow: ITv
}

const TvShow: FC<IProps> = ({tvShow}) => {
    const {id, name, poster_path} = tvShow;
    const navigate = useNavigate();

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
        if (e.currentTarget.src !== altImg) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = altImg;
        }
    };

    const toDetails = (): void => {
        navigate(`/tv-show/${id}`);
    };

    return (
        <div className={styles.Card} onClick={toDetails}>
            <img src={`${posterURL}${poster_path}`} alt={name} onError={handleImageError}/>
            <p>{name}</p>
        </div>
    );
};

export {TvShow};