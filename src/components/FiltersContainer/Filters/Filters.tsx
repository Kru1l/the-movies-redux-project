import {ChangeEvent, SyntheticEvent, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import styles from './Filters.module.css';
import {Genres} from "../Genres/Genres";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genreActions, movieActions, tvActions} from "../../../store";

const Filters = () => {
    const [expandedSort, setExpandedSort] = useState<string>('panel1');
    const [expandedGenres, setExpandedGenres] = useState<string>(null);

    const {sortMv} = useAppSelector(state => state.movies);
    const {sortTv} = useAppSelector(state => state.tvShows);
    const {isDarkMode} = useAppSelector(state => state.theme);

    const dispatch = useAppDispatch();

    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleSortChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean): void => {
        setExpandedSort(isExpanded ? panel : null);
    };
    const handleGenresChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean): void => {
        setExpandedGenres(isExpanded ? panel : null);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(genreActions.clearChecked());
        dispatch(genreActions.deleteGenresInfo());

        if (pathname.includes('movies')) {
            dispatch(movieActions.setSortMv((event.target as HTMLInputElement).value));
            setExpandedGenres(null);
            navigate('/movies');
        } else if (pathname.includes('tv-shows')) {
            dispatch(tvActions.setSortTv((event.target as HTMLInputElement).value));
            setExpandedGenres(null);
            navigate('/tv-shows');
        }
    };

    return (
        <div className={`${styles.Filters} ${isDarkMode && styles.dark}`}>
            <Accordion className={styles.accordion}
                       expanded={expandedSort === 'panel1'} onChange={handleSortChange('panel1')}
                       sx={{background: 'transparent', boxShadow: 0}}>
                <AccordionSummary
                    expandIcon={expandedSort === 'panel1' ? <RemoveIcon/> : <AddIcon/>}
                >
                    <Typography sx={{ml: '11px'}}><b>SORT BY</b></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup
                            sx={{ml: '11px'}}
                            value={pathname.includes('movies') ? sortMv : sortTv}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                className={(pathname.includes('movies') && sortMv === 'popular') || (pathname.includes('tv-shows') && sortTv === 'popular')
                                    ?
                                    styles.activeLabel : styles.label}

                                value="popular" control={<Radio color={isDarkMode ? 'default' : 'success'}/>}
                                label="Popular"
                            />

                            <FormControlLabel
                                className={(pathname.includes('movies') && sortMv === 'nowPlaying') || (pathname.includes('tv-shows') && sortTv === 'airingToday')
                                    ?
                                    styles.activeLabel : styles.label}

                                value={pathname.includes('movies') ? 'nowPlaying' : 'airingToday'}
                                control={<Radio color={isDarkMode ? 'default' : 'success'}/>}
                                label={pathname.includes('movies') ? 'Now Playing' : 'Airing Today'}/>

                            <FormControlLabel
                                className={(pathname.includes('movies') && sortMv === 'topRated') || (pathname.includes('tv-shows') && sortTv === 'topRated')
                                    ?
                                    styles.activeLabel : styles.label}

                                value="topRated" control={<Radio color={isDarkMode ? 'default' : 'success'}/>}
                                label="Top Rated"/>

                            <FormControlLabel
                                className={(pathname.includes('movies') && sortMv === 'upcoming') || (pathname.includes('tv-shows') && sortTv === 'onTheAir')
                                    ?
                                    styles.activeLabel : styles.label}

                                value={pathname.includes('movies') ? 'upcoming' : 'onTheAir'}
                                control={<Radio color={isDarkMode ? 'default' : 'success'}/>}
                                label={pathname.includes('movies') ? 'Upcoming' : 'On The Air'}/>
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}
                       expanded={expandedGenres === 'panel1'} onChange={handleGenresChange('panel1')}
                       sx={{background: 'transparent', border: 'none', boxShadow: 0}}>
                <AccordionSummary
                    expandIcon={expandedGenres === 'panel1' ? <RemoveIcon/> : <AddIcon/>}
                >
                    <Typography sx={{ml: '11px'}}><b>GENRES</b></Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ml: '11px'}}>
                    <Genres/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export {Filters};