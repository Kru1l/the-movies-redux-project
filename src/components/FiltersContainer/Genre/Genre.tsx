import {ChangeEvent, FC} from 'react';
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
    const {checkedMv, checkedTv} = useAppSelector(state => state.genres);


    const {pathname} = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChangeMovie = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(genreActions.setCheckedMv({name, checkedMv: event.target.checked}));
        navigate('/movies');
        if (event.target.checked) {
            dispatch(genreActions.setGenresMvInfo({id, name}));
        } else {
            dispatch(genreActions.deleteGenreMv({id, name}));
        }
    };

    const handleChangeTv = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(genreActions.setCheckedTv({name, checkedTv: event.target.checked}));
        navigate('/tv-shows');
        if (event.target.checked) {
            dispatch(genreActions.setGenresTvInfo({id, name}));
        } else {
            dispatch(genreActions.deleteGenreTv({id, name}));
        }
    };

    return (
        <FormControlLabel className={styles.label}
                          control={<Checkbox
                              checked={pathname.includes('/movies') ? checkedMv[name] || false : checkedTv[name] || false}
                              onChange={pathname.includes('/movies') ? handleChangeMovie : handleChangeTv}
                              name={name}
                              color={'success'}/>}
                          label={name}/>
    );
};

export {Genre};

