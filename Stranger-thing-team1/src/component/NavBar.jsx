import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Access the history object

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log("Token from session storage:", storedToken);

    setIsLoggedIn(!!storedToken);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate('/Home') // Programmatically navigate to the home page
    window.location.reload();
  };

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
        {isLoggedIn ? (
          <>
            <Link to="/Profile" className="nav-link">
              PROFILE
            </Link>
            <button onClick={handleLogout} className="nav-button">
              LOGOUT
            </button>
          </>
        ) : (
          <Link to="/Login" className="nav-link">
            LOGIN
          </Link>
        )}
      </nav>
    </div>
  );
}



