import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(""); 
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log("Token from session storage:", storedToken);

    setIsLoggedIn(!!storedToken);
  }, []); 

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token and username from session storage and update the state
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
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
         {/* Conditionally render LOGIN or PROFILE link based on isLoggedIn */}
        {isLoggedIn ? (
          <>
            <Link to="/Profile" className="nav-link">
              PROFILE
            </Link>
            <button onClick={handleLogout} className="nav-link">
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

