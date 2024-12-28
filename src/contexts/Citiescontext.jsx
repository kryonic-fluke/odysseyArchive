import { createContext, useContext, useEffect, useState } from "react";


const BASE_URL='http://localhost:9000/cities'
const CitiesContext = createContext()

function Citiescontext({children}) {
    const [cities, setcities] = useState([])
    const [isLoading, setIsLoading ] = useState(false)
  
    useEffect(function(){
      async function  fetchCities(){
          try{const res = await fetch(`${BASE_URL}`);
          setIsLoading(true)
          const data  = await res.json();
          setcities(data)}
          catch{  
            alert("error in loading cities data");
          }
          finally{
              setIsLoading(false);
          }
      }
      fetchCities();
    },[])

 return  ( <CitiesContext.Provider value={{
    cities,
    isLoading,
 }}>
{children}
   </CitiesContext.Provider>)

}
function useCity(){
    const context = useContext(CitiesContext)
    if(context ===undefined) throw Error("context is used out of scope")
        return context;
}
export  {Citiescontext,useCity};