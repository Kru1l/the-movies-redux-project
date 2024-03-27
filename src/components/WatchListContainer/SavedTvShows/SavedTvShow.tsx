import {FC, SyntheticEvent} from 'react';
import {useNavigate} from "react-router-dom";

import styles from "../../../styles/movies-Tvs.module.css";
import {posterURL} from "../../../constans";
import {ITvShowDetails} from "../../../interfaces";
import {useAppSelector} from "../../../hooks";
import altImg from "../../../styles/images/alt-img.png";

interface IProps {
    tv: ITvShowDetails
}

const SavedTvShow: FC<IProps> = ({tv}) => {
    const {id, name, poster_path} = tv;

    const {isDarkMode} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
        if (event.currentTarget.src !== altImg) {
            event.currentTarget.onerror = null;
            event.currentTarget.src = altImg;
        }
    };

    return (
        <div className={`${styles.Card} ${isDarkMode && styles.darkCard}`} onClick={() => navigate(`/tv-show/${id}`)}>
            <img src={`${posterURL}${poster_path}`} alt={name} onError={handleImageError}/>
            <p>{name}</p>
        </div>
    );
};

export {SavedTvShow};