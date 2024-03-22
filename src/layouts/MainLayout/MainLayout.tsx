import {Outlet} from "react-router-dom";

import styles from './MainLayout.module.css';
import {Header, Filters} from "../../components";

const MainLayout = () => {

    return (
        <div className={styles.MainLayout}>
            <Header/>
            <Filters/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};