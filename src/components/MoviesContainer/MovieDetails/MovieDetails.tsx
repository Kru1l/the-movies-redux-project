import {ChangeEvent, FC, SyntheticEvent} from "react";
import {Badge, Button, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Checkbox, FormControlLabel, Rating} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

import styles from '../../../styles/details.module.css';
import {posterURL} from "../../../constans";
import {IMovieDetails} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genreActions, watchListActions} from "../../../store";
import imdbImg from '../../../styles/images/imdb.png';
import altImg from '../../../styles/images/alt-img.png';


interface IProps {
    movieDetails: IMovieDetails
}

const MovieDetails: FC<IProps> = ({movieDetails}) => {
    const {
        title,
        poster_path,
        release_date,
        runtime,
        overview,
        genres,
        vote_average,
        production_companies,
        production_countries,
        status
    } = movieDetails;

    const {checkedWatchMovie} = useAppSelector(state => state.watchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
        if (e.currentTarget.src !== altImg) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = altImg;
        }
    };

    const toGenre = (id: number, name: string): void => {
        dispatch(genreActions.setCheckedMv({name, checkedMv: true}));
        dispatch(genreActions.setGenresMvInfo({id, name}));
        navigate('/movies');
    };

    const handleChangeMovie = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(watchListActions.setCheckedWatchMovie({title, checkedWatchMovie: event.target.checked}));

        if (event.target.checked) {
            dispatch(watchListActions.addMovieToList({movieDetails}));
        } else {
            dispatch(watchListActions.deleteMovieFromList({movieDetails}));
        }
    };

    return (
        <div className={styles.Details}>
            <main>
                <section className={styles.left}>
                    <img id={styles.poster} src={`${posterURL}/${poster_path}`} alt={title} onError={handleImageError}/>
                </section>

                <section className={styles.right}>
                    <h1 id={styles.title}>{title}</h1>

                    <p>{production_countries[0]?.name} | {release_date?.split('-').slice()[0]} | {runtime}m</p>
                    <p>{status}</p>

                    <Stack className={styles.genres} direction="horizontal" gap={2}>
                        {genres.map((genre, index) =>
                            <Button key={index} variant="secondary" onClick={() => toGenre(genre.id, genre.name)}>
                                <Badge bg="dark">{genre.name}</Badge>
                            </Button>
                        )}
                    </Stack>

                    <Stack direction={'horizontal'} style={{margin: '20px 0'}}>
                        <img src={imdbImg} alt="IMDb"/>
                        <Rating name="customized-10" value={vote_average} precision={0.1} max={10} readOnly/>
                    </Stack>

                    <FormControlLabel
                        label={!checkedWatchMovie[title] ? <b>ADD TO WATCHLIST</b> : <b>REMOVE FROM WATCHLIST</b>}
                        control={<Checkbox
                            size={'large'}
                            name={title}
                            checked={checkedWatchMovie[title] || false}
                            onChange={handleChangeMovie}
                            color={'success'}
                            icon={<LibraryAddIcon/>}
                            checkedIcon={<LibraryAddCheckIcon color={'warning'}/>}
                        />}
                    />

                    <p id={styles.over}><i>{overview}</i></p>

                    {production_companies.length ? <p>Studio: {production_companies[0].name}</p> : null}
                </section>
            </main>
        </div>
    );
};

export {MovieDetails};