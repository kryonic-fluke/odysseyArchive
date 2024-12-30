// import Appnav from "../componenets/Appnav";
import Map from "../componenets/Map";
import Sidebar from "../componenets/Sidebar";
import User from "../componenets/User";
import styles from './Applayout.module.css'

function Applayout() {
    return (

        <div className={styles.app}>
            <Sidebar/>
            <Map/>
            <User/>
        </div>
    )
}

export default Applayout;

