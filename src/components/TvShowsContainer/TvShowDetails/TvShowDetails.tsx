import {FC} from "react";

import styles from './TvShowDetails.module.css';
import {ITvShowDetails} from "../../../interfaces";
import {posterURL} from "../../../constans";


interface IProps {
    tvShowDetails: ITvShowDetails
}

const TvShowDetails: FC<IProps> = ({tvShowDetails}) => {
    const {poster_path, name} = tvShowDetails;

    // console.log(state.card)

    return (
        <div className={styles.CardDetails}>
                <main>
                    <section className={styles.left}>
                        <img id={styles.poster} src={`${posterURL}/${poster_path}`} alt={name}/>
                    </section>


                </main>
        </div>
    );
};

export {TvShowDetails};