import { useState } from 'react';
import { loginUser } from '../API/index';
import Register from './Register';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSuccess = (token) => {
    // Store the token in sessionStorage
    sessionStorage.setItem('token', token);
    // Redirect the user to a profile page
    navigate('/Profile'); 
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send login data to the backend
    const loginData = {
      username,
      password,
    };

    try {
      const result = await loginUser(loginData);
      // Handle success
      if (result.data) {
        handleLoginSuccess(result.token);
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
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
      {showRegistrationForm && <Register />}
      <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
