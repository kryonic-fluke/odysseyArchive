import { useSearchParams } from "react-router-dom";

export  function UseUrlposition() {
     const [searchParams] = useSearchParams(); // fetching of data from the url happens  here
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");
        // console.log(lng);
        
    return (
        [lat,lng]
    )
}

export default UseUrlposition;