import  { useState } from 'react';
import { registerUser } from '../API/index';
import { Link } from 'react-router-dom';


function Register(onSuccess) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match and meet the minimum length requirement
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8 || username.length < 3) {
      setError("Password should be at least 8 characters long and username should be at least 3 characters long.");
      return;
    }

    // Send registration data to the backend
    const registrationData = {
      username,
      password,
    };

    try {
      const result = await registerUser(registrationData);
      // Handle success (you'll likely get a token in the result)
       if (result.success){
        onSuccess();
        window.alert("Registration successful! You can now log in.");
       }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit" className="signup-button" > <Link to="/Login">Sign Up </Link></button>
      </form>

        {/* Add Link to the login page after the form */}
      <p className="login-link">Already have an account? <Link to="/Login">Login</Link></p>
    </div>
  );
}

export default Register;
