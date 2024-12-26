import {  NavLink } from "react-router-dom";
import styles from "./Pagenav.module.css"
import Logo from "./Logo";
function Pagenav() {
  return (
    <nav className={styles.nav}>
      <Logo/>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/price">Pricing </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>Login </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Pagenav;
