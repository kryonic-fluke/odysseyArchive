import Appnav from './Appnav';
import styles from './Sidebar.module.css'
import Logo from "./Logo"
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <Appnav/>

            <Outlet/> 
           <Footer/>
        </div>
    )
}

export default Sidebar;

//Outlet element shows shildren of the parent route , children element of parent route is rendered in outlet element 