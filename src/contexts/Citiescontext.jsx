import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";


const BASE_URL='http://localhost:9000/cities'
const CitiesContext = createContext()


const initialstate={
cities:[],
isLoading:false,
currentCity:{},
error:""
}
function reducer(state,action){
switch(action.type){

  case "loading":
     return{
      ...state , isLoading:true,
     }
  case "cities/loaded":
return{
  ...state,isLoading:false , cities:action.payload,
}
  case "city/loaded":
    return{
      ...state, isLoading:false,currentCity:action.payload
    }

  case "city/created":
    return{
      ...state,isLoading:false, cities:[...state.cities,action.payload], currentCity:action.payload
    };

    case "city/deleted":
      return{
        ...state,isLoading:false, cities:state.cities.filter((city)=>city.id!== action.payload), currentCity:{}
      };
  case "rejected":
    return {
      
        ...state, isLoading:false,error:action.payload
      
    }


  default:
    throw new Error("Unknown action type")

}
}


//note reducer need to be pure function , api request can not be done


function Citiescontext({children}) {
const [{cities,isLoading,currentCity},dispatch] = useReducer(reducer,initialstate)

   

  
    useEffect(function(){
      async function  fetchCities(){
        dispatch({type:"loading"})

          try{const res = await fetch(`${BASE_URL}`); 
          const data  = await res.json();
          // console.log(data);
          dispatch({type:"cities/loaded",payload:data})
        }
          
          catch{  
            dispatch({type:"rejected", payload:"error in loading cities data"});
          }
          
          }
          fetchCities();
      }
    ,[])

    
    
const getCity= useCallback(  async  function getCity(id){
      if(Number(id)=== currentCity.id) return
      dispatch({type:"loading"})
      try{const res = await fetch(`${BASE_URL}/${id}`);
      const data  = await res.json();
      console.log(data);             //gets the receltly selected city
      dispatch({type:"city/loaded",payload:data})
    }
      
      catch{  
        dispatch({type:"rejected", payload:"error in loading citiy data"});
      }
     
      
    },[currentCity.id])


    async  function createCity(newCity){
      
      dispatch({type:"loading"})
      try{
        const res = await fetch(`${BASE_URL}`,{    //post request, to add the new city
        method:"POST",
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json",
 
        },                          
      });
      const data  = await res.json();
      dispatch({type:"city/created",payload:data})
      // console.log(cities);
      
    }
      catch{  
        alert("error in creating cities data"); 
      }
      
      
    }
    
    async  function deleteCity(id){
      
      dispatch({type:"loading"})
      try{
         await fetch(`${BASE_URL}/${id}`,{    //post request, to add the new city
        method:"DELETE",
                                
      });
      dispatch({type:"city/deleted",payload:id})
           
    }
    catch{  
      dispatch({type:"rejected", payload:"error in deleting cities data"});
    }
      
    }
    

 return  ( <CitiesContext.Provider value={{
    cities,
    isLoading,
    currentCity,
    getCity,
    
    createCity,
    deleteCity,
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


