import {ChangeEvent, FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
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
    const [checked, setChecked] = useState<boolean>(localStorage.getItem(`genre-${id}`) === 'true' || false);
    // const [checked, setChecked] = useState<boolean>(false);

    const {trigger} = useAppSelector(state => state.genres);

    useEffect(() => {

    }, [trigger]);


    const {pathname} = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChangeMovie = (event: ChangeEvent<HTMLInputElement>): void => {
        setChecked(event.target.checked);
        localStorage.setItem(`genreMv-${id}`, JSON.stringify(event.target.checked));
        navigate('/movies');
        if (event.target.checked) {
            dispatch(genreActions.setGenresMvIds(id));
        } else {
            dispatch(genreActions.deleteGenresMvId(id));
        }
    };

    const handleChangeTv = (event: ChangeEvent<HTMLInputElement>): void => {
        setChecked(event.target.checked);
        navigate('/tv-shows');
        if (event.target.checked) {
            dispatch(genreActions.setGenresTvIds(id));
        } else {
            dispatch(genreActions.deleteGenresTvId(id));
        }
    };

    return (
        <FormControlLabel className={styles.label}
                          control={<Checkbox checked={checked}
                                             onChange={pathname.includes('/movies') ? handleChangeMovie : handleChangeTv}
                                             color={'success'}/>}
                          label={name}/>
    );
};

export {Genre};
