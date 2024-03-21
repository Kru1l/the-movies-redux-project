import {Movies, MvFilters} from "../../components";

import styles from './MoviesPage.module.css';

const MoviesPage = () => {

    return (
        <div style={{display: 'flex'}}>
            <MvFilters/>
            <Movies/>
        </div>
    );
};

export {MoviesPage};