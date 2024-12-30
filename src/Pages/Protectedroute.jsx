import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAtuhContext";
import { useEffect } from "react";

function Protectedroute({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(function(){
        if(!isAuthenticated) navigate('/')
    },[isAuthenticated,navigate])
    
    if (isAuthenticated) return children
    return null;
}

export default Protectedroute;