import {FC, SyntheticEvent} from 'react';
import {useNavigate} from "react-router-dom";

import styles from '../../../styles/movies-Tvs.module.css';
import altImg from "../../../styles/images/alt-img.png";
import {posterURL} from "../../../constans";
import {ITv} from "../../../interfaces";
import {useAppSelector} from "../../../hooks";

interface IProps {
    tvShow: ITv
}

const TvShow: FC<IProps> = ({tvShow}) => {
    const {id, name, poster_path} = tvShow;

    const {isDarkMode} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
        if (e.currentTarget.src !== altImg) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = altImg;
        }
    };

    return (
        <div className={`${styles.Card} ${isDarkMode && styles.darkCard}`} onClick={() => navigate(`/tv-show/${id}`)}>
            <img src={`${posterURL}${poster_path}`} alt={name} onError={handleImageError}/>
            <p>{name}</p>
        </div>
    );
};

export {TvShow};