import { createContext, useContext, useEffect, useState } from "react";


const BASE_URL='http://localhost:9000/cities'
const CitiesContext = createContext()

function Citiescontext({children}) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading ] = useState(false);
    const [currentCity,setCurrentCity] = useState({})

  
    useEffect(function(){
      async function  fetchCities(){
          try{const res = await fetch(`${BASE_URL}`); 
          setIsLoading(true)
          const data  = await res.json();
          // console.log(data);
          setCities(data)}
          
          catch{  
            alert("error in loading cities data");
          }
          finally{
              setIsLoading(false);
          }
      }
      fetchCities();
    },[])

    
    
    async  function getCity(id){
      
      try{const res = await fetch(`${BASE_URL}/${id}`);
      setIsLoading(true)
      const data  = await res.json();
      // console.log(data);             //gets the receltly selected city
      setCurrentCity(data)}
      
      catch{  
        alert("error in loading cities data"); 
      }
      finally{
        setIsLoading(false);
      }
      
    }


    async  function createCity(newCity){
      
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`,{    //post request, to add the new city
        method:"POST",
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json",
 
        },                          
      });
      const data  = await res.json();
      setCities((cities)=>[...cities,data])
      console.log(cities);
      
    }
      catch{  
        alert("error in loading cities data"); 
      }
      finally{
        setIsLoading(false);
      }
      
    }
    
    async  function deleteCity(id){
      
      try{
        setIsLoading(true);
         await fetch(`${BASE_URL}/${id}`,{    //post request, to add the new city
        method:"DELETE",
                                
      });
      setCities((cities)=>cities.filter((city)=>city.id!== id))
           
    }
      catch{  
        alert("error in deleting the  cities data"); 
      }
      finally{
        setIsLoading(false);
      }
      
    }
    

 return  ( <CitiesContext.Provider value={{
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity
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