import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {TvShowDetails} from "../../components";
import {tvActions} from "../../store";
import {useAppDispatch, useAppSelector} from "../../hooks";

const TvShowDetailsPage = () => {
    const {tvShowDetails} = useAppSelector(state => state.tvShows);
    const state = useParams<{ id: string, card: string }>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (state?.id) {
            dispatch(tvActions.getById({id: +state.id}));
        }
    }, [state, dispatch]);

    return (
        <div>
            {tvShowDetails && <TvShowDetails tvShowDetails={tvShowDetails}/>}
        </div>
    );
};

export {TvShowDetailsPage};