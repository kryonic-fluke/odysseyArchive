import CityItem from './CityItem';
import styles from './CountryList.module.css'
import Message from "./Message"
import Spinner from "./Spinner"

function CountryList({cities, isLoading}) {
 
    if(isLoading) return <Spinner/>
    if(!cities.length) <Message message="Add your first city clicking on a city on the map"/>
    return (
        <ul className={styles.countryList}>
            {cities.map((city)=><CityItem city={city} key={city.id}/>)}
        </ul>
    )
} 





export default CountryList;