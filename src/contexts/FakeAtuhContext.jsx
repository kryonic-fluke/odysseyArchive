import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        inAuthenticated: false,
      };

    default:
      throw new Error("Unknown action performed");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login( email, password ) {
    // console.log(email,password);
    
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logOut() {
    dispatch({ type: "logout" });
  }

  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("contxt is used outside the provider reach");
  return context;
}

export { useAuth, AuthProvider };
