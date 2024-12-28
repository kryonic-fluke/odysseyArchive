import { useCity } from '../contexts/Citiescontext';
import CityItem from './CityItem';
import styles from './CityList.module.css'
import Message from "./Message"

import Spinner from "./Spinner"
function CitiList() {
    const {cities,isLoading} =useCity()
 
    if(isLoading) return <Spinner/>
    if(!cities.length) <Message message="Add your first city clicking on a city on the map"/>
    return (
        <ul className={styles.cityList}>
            {cities.map((city)=><CityItem city={city} key={city.id}/>)}
        </ul>
    )
}

export default CitiList;