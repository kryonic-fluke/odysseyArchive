import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/FakeAtuhContext";
import Button from "../componenets/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login,isAuthenticated}=useAuth();
  
  const navigate = useNavigate();
  function handlelogin(e){
    e.preventDefault();
    // console.log(email,password);
    
   if(email&&password) {
    login(email,password)
  }
  }


  useEffect(function () {
    // console.log(isAuthenticated);
    
    if (isAuthenticated === true) navigate("/app", {replace:true});
    if(isAuthenticated===false){
     
      
    }
  },[isAuthenticated,navigate]);
  return (

    <main className={styles.login}>
      <form className={styles.form} onSubmit={handlelogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {/* <button onClick={handlelogin}>Login</button> */}
          <Button type="primary">
              login
          </Button>
        </div>
      </form>
    </main>
  );
}
