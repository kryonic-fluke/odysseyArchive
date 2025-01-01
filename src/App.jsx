import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/FakeAtuhContext";
import Protectedroute from "./Pages/Protectedroute";
import { Citiescontext } from "./contexts/Citiescontext";
import CitiList from "./componenets/CityList";
import CountryList from "./componenets/CountryList";
import City from "./componenets/City";
import Form from "./componenets/Form";
import SpinnerFullPage from "./componenets/SpinnerFullPage";
const Home = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const Applayout = lazy(() => import("./Pages/Applayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Home from "./Pages/Homepage";
// import PageNotFound from "./PageNotFound";
// import Applayout from "./Pages/Applayout";
// import Login from "./Pages/Login";

function App() {
  return (
    <AuthProvider>
      <Citiescontext>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="price" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <Protectedroute>
                    <Applayout />
                  </Protectedroute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CitiList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="country" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Citiescontext>
    </AuthProvider>
  );
}

export default App;

//nested route is needed  when we need , to controle a part of a ui to be controled by
// part of a url
//to show or change part of a url based on a changing a part of url

//index route sets the default child route , when no child route matches
