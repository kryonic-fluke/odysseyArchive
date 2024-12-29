import { useSearchParams } from "react-router-dom";

export  function UseUrlposition() {
     const [searchParams] = useSearchParams();
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");
        console.log(lng);
        
    return (
        [lat,lng]
    )
}

export default UseUrlposition;