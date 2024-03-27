import {Outlet, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './MainLayout.module.css';
import {Filters, Header} from "../../components";

const MainLayout = () => {
    const {pathname} = useLocation();

    return (
        <div
            className={`${styles.MainLayout} ${!(pathname.includes('movies') || pathname.includes('tv-shows')) && styles.removeMr}`}>
            <Header/>
            {(pathname.includes('movies') || pathname.includes('tv-shows')) && <Filters/>}
            <Outlet/>
        </div>
    );
};

export {MainLayout};