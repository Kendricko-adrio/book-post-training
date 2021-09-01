import { Link } from "react-router-dom";
import "./NavbarStyle.css";

export const Navbar = () => {
  return (
    <nav>
      <Link className="link" to={"/"}>
        Book
      </Link>

      <ul>
        <Link to={"/search"} className="link">
          Search
        </Link>
        <Link to={"/favorite"} className="link">
          Favorite
        </Link>
      </ul>
    </nav>
  );
};
