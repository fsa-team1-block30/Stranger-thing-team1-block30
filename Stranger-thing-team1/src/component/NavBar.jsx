
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <div className="nav-container">
      <h1 className="nav-title">Stranger Things</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">
          HOME
        </Link>
        <Link to="/Posts" className="nav-link">
          POST
        </Link>
        <Link to="/Login" className="nav-link">
          LOGIN
        </Link>
        <Link to="/Profile" className="nav-link">
          PROFILE
        </Link>
      </nav>
    </div>
  );
}

