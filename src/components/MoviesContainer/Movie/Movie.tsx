import {FC} from 'react';

import {posterURL} from "../../../constans";
import {IMovie} from "../../../interfaces";

interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;

    return (
        <div>
            <img src={`${posterURL}${poster_path}`} alt={title}/>
            <p>{title}</p>
        </div>
    );
};

export {Movie};