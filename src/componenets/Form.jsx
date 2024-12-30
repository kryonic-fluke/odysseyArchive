
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import UseUrlposition from "../hooks/UseUrlposition";
import Message from "./Message"
import Spinner from "./Spinner"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useCity } from "../contexts/Citiescontext";
const Base_Url= "https://api.bigdatacloud.net/data/reverse-geocode-client";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
     const [lat,lng]=UseUrlposition(); // gets the lat and lng passed from map through url 
  const {createCity,isLoading} =useCity();

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isloadingGeocoding , setisloadingGeocoding]  = useState(false);
  const [emoji,setEmoji] = useState();
  const [geoCodingError, setgeocodingError]=useState()

useEffect(function(){
  if(!lat && !lng) return ;
  async function fetchCityData() {
    try{
      setisloadingGeocoding(true);
      setgeocodingError("")
      const res = await fetch(`${Base_Url}?latitude=${lat}&longitude=${lng}`);
      const data= await res.json();
      if(!data.countryCode) throw Error ("are you crazy or somthin?!!,that doesn't seem be a country 🤣 lol!!")
      // console.log(data);
      setEmoji(convertToEmoji(data.countryCode))
      setCityName(data.city ||data.locality || "");
      setCountry(data.countryName);

    }
    catch(err){
        setgeocodingError(err.message)
    }
    finally{
      setisloadingGeocoding(false)
    }
  }
fetchCityData()
},[lat, lng])

async function handleSubmit(e){
  e.preventDefault();
if(!cityName || !date) return ;
const newCity = {
  cityName,
  country,
  emoji,
  date,
  notes,
  position:{lat,lng}
};
  await createCity(newCity);
navigate("/app/cities")
}
if(!lat && !lng) return <Message message ="Start by clicking somewhere on the map"/>

if(isloadingGeocoding) return <Spinner/>
if(geoCodingError) return <Message message=  {geoCodingError}/>

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading: ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={(date)=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"  id="date"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>

        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
