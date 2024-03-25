import {NavLink} from "react-router-dom";
import {Box, IconButton} from '@mui/material';
import {AccountCircle} from "@mui/icons-material";

import styles from './Header.module.css';
import {SearchForm} from "../SearchForm/SearchForm";
import {ThemeSwitch} from "../ThemeSwitch/ThemeSwitch";


const Header = () => {

    return (
        <div className={styles.Header}>
            <div className={styles.logo}>MOVIES</div>

            <SearchForm/>

            <nav>
                <NavLink to={'/tv-shows'}>TV SHOWS</NavLink>
                <NavLink to={'/movies'}>MOVIES</NavLink>
            </nav>

            <ThemeSwitch/>

            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <IconButton
                    size="large"
                    color="success"
                >
                    <AccountCircle/>
                </IconButton>
            </Box>
        </div>
    );
};

export {Header};