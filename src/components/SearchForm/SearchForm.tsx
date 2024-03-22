import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {alpha, styled} from '@mui/material/styles';

import {useAppLocation} from "../../hooks";
import {IQuery} from "../../interfaces";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'silver',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
        },
    },
}));


const SearchForm = () => {
    const {register, handleSubmit, reset} = useForm<IQuery>();
    const navigate = useNavigate();
    const {pathname} = useAppLocation();

    // console.log(pathname);

    const search: SubmitHandler<IQuery> = ({title}): void => {
        navigate(pathname.includes('/movies') ? `movies/${title}` : `tv-shows/${title}`);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(search)}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    type={'text'}
                    placeholder="Search…"
                    {...register('title')}
                />
            </Search>
        </form>
    );
};

export {SearchForm};