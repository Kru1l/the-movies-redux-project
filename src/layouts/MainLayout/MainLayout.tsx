import {Outlet} from "react-router-dom";

import styles from './MainLayout.module.css';
import {Header, Filters} from "../../components";
import {useAppSelector} from "../../hooks";

const MainLayout = () => {
    const {theme, isDarkMode} = useAppSelector(state => state.theme);

    return (
        <div className={`${styles.MainLayout} ${styles.sas}}`}>
            <Header/>
            <Filters/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};