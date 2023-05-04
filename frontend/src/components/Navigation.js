import { Link } from "react-router-dom";
import style from "./Navigation.module.css";
function Navigation() {
  return (

      <ul className={style.navbar}>
        <li>
          <Link to="/">Add Person</Link>
        </li>
        <li>
          <Link to="/showUsers"> Show Persons</Link>
        </li>
      </ul>

  );
}

export default Navigation;
