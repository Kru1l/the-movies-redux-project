import {Movies, MvFilters} from "../../components";


const MoviesPage = () => {

    return (
        <div style={{display: 'flex'}}>
            <MvFilters/>
            <Movies/>
        </div>
    );
};

export {MoviesPage};