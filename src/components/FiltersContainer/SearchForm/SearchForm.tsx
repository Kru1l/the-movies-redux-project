import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import {IQuery} from "../../../interfaces";
import {genreActions} from "../../../store";
import {useAppDispatch, useAppLocation} from "../../../hooks";

const SearchForm = () => {
    const {register, handleSubmit, reset} = useForm<IQuery>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {pathname} = useAppLocation();

    const search: SubmitHandler<IQuery> = ({title}): void => {
        dispatch(genreActions.deleteGenresInfo());
        dispatch(genreActions.clearChecked());
        navigate(pathname.includes('movie') ? `/movies/${title}` : `/tv-shows/${title}`);
        reset();
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(search)}
            sx={{
                p: '2px 4px',
                m: '0 25px 0 12px',
                display: 'flex',
                alignItems: 'center',
                width: 300,
                height: 34,
                backgroundColor: '#303031',
                ':hover': {
                    backgroundColor: 'rgb(114,114,114)'
                }
            }}
        >
            <InputBase
                sx={{ml: 2, flex: 1, color: 'silver'}}
                placeholder="Search..."
                {...register('title')}
            />
            <IconButton type="submit" sx={{p: '6px'}}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
};

export {SearchForm};