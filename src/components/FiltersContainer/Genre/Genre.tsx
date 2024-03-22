import {ChangeEvent, FC, useState} from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";

import styles from './Genre.module.css';
import {IGenre} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genreActions} from "../../../store";

interface IProps {
    genre: IGenre
}

const Genre: FC<IProps> = ({genre}) => {
    const {id, name} = genre;
    const dispatch = useAppDispatch();

    const [checked, setChecked] = useState<boolean>(localStorage.getItem(`genre-${id}`) === 'true');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        localStorage.setItem(`genre-${id}`, String(event.target.checked));
        if (event.target.checked) {
            dispatch(genreActions.setGenresIds(id));
        } else {
            dispatch(genreActions.deleteGenresId(id));
        }
    };

    return (
        <FormControlLabel className={styles.label}
            control={<Checkbox checked={checked} onChange={handleChange} color={'success'}/>}
            label={name}/>

    );
};

export {Genre};
