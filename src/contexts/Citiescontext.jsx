import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = 'userCities';

const CitiesContext = createContext();

const initialstate = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state, isLoading: true,
      }
    case "cities/loaded":
      return {
        ...state, isLoading: false, cities: action.payload,
      }
    case "city/loaded":
      return {
        ...state, isLoading: false, currentCity: action.payload
      }
    case "city/created":
      return {
        ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload
      };
    case "city/deleted":
      return {
        ...state, isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload), currentCity: {}
      };
    case "rejected":
      return {
        ...state, isLoading: false, error: action.payload
      }
    default:
      throw new Error("Unknown action type")
  }
}

function Citiescontext({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialstate);

  // Load cities from localStorage on app start
  useEffect(function () {
    async function loadCities() {
      dispatch({ type: "loading" });
      try {
        // Get cities from localStorage
        const savedCities = localStorage.getItem(STORAGE_KEY);
        const cities = savedCities ? JSON.parse(savedCities) : [];
        
        dispatch({ type: "cities/loaded", payload: cities });
      } catch {
        dispatch({ type: "rejected", payload: "Error loading cities from storage" });
      }
    }
    loadCities();
  }, []);

  // Save cities to localStorage whenever cities array changes
  useEffect(() => {
    if (cities.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    }
  }, [cities]);

  const getCity = useCallback(function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    
    try {
      // Find city in local cities array instead of API call
      const city = cities.find(city => city.id === Number(id));
      if (city) {
        dispatch({ type: "city/loaded", payload: city });
      } else {
        dispatch({ type: "rejected", payload: "City not found" });
      }
    } catch {
      dispatch({ type: "rejected", payload: "Error loading city data" });
    }
  }, [currentCity.id, cities]);

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // Generate a unique ID (simple approach - you might want to use a UUID library)
      const id = Date.now();
      const cityWithId = { ...newCity, id };
      
      dispatch({ type: "city/created", payload: cityWithId });
    } catch {
      dispatch({ type: "rejected", payload: "Error creating city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Error deleting city" });
    }
  }

  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity,
      deleteCity,
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCity() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw Error("Context is used out of scope");
  return context;
}

export { Citiescontext, useCity };