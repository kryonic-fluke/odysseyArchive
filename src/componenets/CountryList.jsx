import styles from './CountryList.module.css'
import Message from "./Message"
import Spinner from "./Spinner"
import CountryItem from "./CountryItem"
import { useCity } from '../contexts/Citiescontext'

function CountryList() {
    const {cities,isLoading} =useCity()


    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.city).includes(city.country)) {
            return [...arr, { country: city.country ,emoji:city.emoji }];
        } else {
            return arr;
        }
    }, []);
        if(isLoading) return <Spinner/>
    if(!cities.length) <Message message="Add your first city clicking on a city on the map"/>
    return (
        <ul className={styles.countryList}>
            {countries.map((country,id)=><CountryItem country ={country} key={id}/>)}
        </ul>
    )
} 








export default CountryList;