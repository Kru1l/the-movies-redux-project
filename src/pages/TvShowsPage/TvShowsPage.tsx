import {TvFilters, TvShows} from "../../components";

const TvShowsPage = () => {

    return (
        <div style={{display: 'flex'}}>
            <TvFilters/>
            <TvShows/>
        </div>
    );
};

export {TvShowsPage};