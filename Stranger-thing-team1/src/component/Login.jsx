import { useState } from 'react';
import { loginUser } from '../API/index';
import Register from './Register';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSuccess = (token) => {
    sessionStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/Profile');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      username,
      password,
    };

    try {
      const result = await loginUser(loginData);
      if (result.data) {
        handleLoginSuccess(result.token);
        window.alert("Login successful!");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
    setRegistrationSuccess(false); // Reset registration success state
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true); // Set registration success state
    setShowRegistrationForm(false); // Hide registration form after successful registration
    
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? 'Logged In' : 'Login'}</h2>
      {isLoggedIn ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {registrationSuccess ? (
            <div>
              <p>Registration successful! Please log in.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="login-username">Username:</label>
                <input
                  type="text"
                  id="login-username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="login-password">Password:</label>
                <input
                  type="password"
                  id="login-password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          )}
          {!isLoggedIn && !registrationSuccess && (
            <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
          )}
        </div>
      )}
      {showRegistrationForm && (
        <Register onSuccess={handleRegistrationSuccess} />
      )}
    </div>
  );
}

export default Login;
