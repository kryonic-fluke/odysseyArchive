import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Home from "./Pages/Homepage";
import PageNotFound from "./PageNotFound";
import Applayout from "./Pages/Applayout";
import Login from "./Pages/Login";
import CitiList from "./componenets/CityList";
import { useEffect, useState } from "react";


const BASE_URL='http://localhost:9000/cities'

function App() {
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
  return ( 
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="price" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<Applayout />}>
        <Route index element = {<CitiList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities" element={<CitiList cities={cities} isLoading={isLoading}/>}/>
          <Route path="country" element={<p>list of contries</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//nested route is needed  when we need , to controle a part of a ui to be controled by
// part of a url
//to show or change part of a url based on a changing a part of url

//index route sets the default child route , when no child route matches
