// import Appnav from "../componenets/Appnav";
import Map from "../componenets/Map";
import Sidebar from "../componenets/Sidebar";
import styles from './Applayout.module.css'

function Applayout() {
    return (
        <div className={styles.app}>
            <Sidebar/>
            <Map/>
        </div>
    )
}

export default Applayout;

