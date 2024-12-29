import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useCity } from '../contexts/Citiescontext';
import { useGeolocation } from '../hooks/Usegeolocation';
import Button from "./Button"
import UseUrlposition from '../hooks/UseUrlposition';

function Map() {
    // Fix typo in state variable name and provide default center position
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCity();
    const {isLoading:isLoadingposition, position:geoLocationPosition, getPosition}=useGeolocation();
   const [maplat,maplng]=UseUrlposition();
    
    useEffect(function(){
     if(maplat&&maplat)   setMapPosition([maplat,maplng])
    },[maplat,maplng])

    useEffect(() => {
        if (geoLocationPosition) {
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
        }
    }, [geoLocationPosition]);

    return (
        <div className={styles.mapContainer} >
            {!geoLocationPosition &&<Button type = "position" onClick={getPosition}>
                {isLoadingposition ? "Loading..." : "Use your position"}
            </Button>}
            <MapContainer 
                center={mapPosition} 
                zoom={6} 
                scrollWheelZoom={true} 
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker 
                        position={[city.position.lat, city.position.lng]} 
                        key={city.id}
                    >
                        <Popup>
                            <span>
                                {city.emoji}
                            </span>
                            <span>
                                {city.cityName}
                            </span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}){
    const map = useMap()
    map.setView(position)
    return null;
}

function DetectClick(){
    const navigate = useNavigate();

    useMapEvents({
        click:(e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map;