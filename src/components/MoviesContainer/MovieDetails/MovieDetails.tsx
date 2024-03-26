import {FC} from "react";
import {NavLink} from "react-router-dom";
import {Badge, Rating, Stack} from "@mui/material";

import styles from '../../../styles/details.module.css';
import {posterURL} from "../../../constans";
import {IMovieDetails} from "../../../interfaces";


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
    } = movieDetails;

    // console.log(state.card)

    return (
        <div className={styles.Details}>
            <main>
                <section className={styles.left}>
                    <img id={styles.poster} src={`${posterURL}/${poster_path}`} alt={title}/>
                </section>

                <section className={styles.right}>
                    <h1 id={styles.title}>{title}</h1>

                    <p>{production_countries[0]?.name} | {release_date?.split('-').slice()[0]} | {runtime}m</p>

                    {/*<ThemeProvider theme={theme}>*/}
                    <Stack className={styles.genres} direction={"row"} spacing={9}>
                        {genres.map(genre =>
                            <NavLink to={`/genres/${genre.id}`} key={genre.id}>
                                <Badge badgeContent={genre.name}
                                       color="primary"/>
                            </NavLink>
                        )}
                    </Stack>

                    <Stack spacing={1} mt={2}>
                        <Rating name="customized-10" defaultValue={vote_average} precision={0.1} max={10} readOnly/>
                    </Stack>
                    {/*</ThemeProvider>*/}

                    <p>{overview}</p>
                    <p>Studio: {production_companies[0]?.name}</p>
                </section>
            </main>
        </div>
    );
};

export {MovieDetails};