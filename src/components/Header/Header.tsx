import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Badge, Box, IconButton} from '@mui/material';
import {AccountCircle} from "@mui/icons-material";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import styles from './Header.module.css';
import {ThemeSwitch} from "../ThemeSwitch/ThemeSwitch";
import {SearchForm} from "../FiltersContainer";
import {useAppSelector} from "../../hooks";

const Header = () => {
    const {savedMovies, savedTvShows} = useAppSelector(state => state.watchList);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (
        <div className={`${styles.Header} ${!(pathname.includes('movies') || pathname.includes('tv-shows') || pathname.includes('profile'))
            &&
            styles.limpid}`}>

            <div className={styles.logo}>MOVIES</div>

            <SearchForm/>

            <nav>
                <NavLink to={'/tv-shows'}>TV SHOWS</NavLink>
                <NavLink to={'/movies'}>MOVIES</NavLink>
            </nav>

            <ThemeSwitch/>

            <Badge sx={{cursor: 'pointer'}} badgeContent={savedMovies.length + savedTvShows.length}
                   color="success">
                <VideoLibraryIcon color="warning" fontSize={'large'} onClick={() => navigate('/profile/watch-list')}/>
            </Badge>

            <Box sx={{display: {xs: 'none', md: 'flex'}, ml: 2}}>
                <IconButton
                    size="large"
                    color="success"
                >
                    <AccountCircle fontSize={'large'}/>
                </IconButton>
            </Box>
        </div>
    );
};

export {Header};