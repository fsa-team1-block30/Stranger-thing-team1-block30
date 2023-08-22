import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="home-container">
      {username ? (
        <>
          <p className="welcome">Welcome to Stranger's Things, <span className="emphasized">{username}</span>!</p>
          <button className="profile-button" onClick={() => navigate('/profile')}>Go to Profile</button>
        </>
      ) : (
        <>
          <p className="signup-message">
            Welcome to Stranger's Things! Log in to access your profile.
          </p>
          <button className="log-button" onClick={() => navigate('/Login')}>Login</button>
        </>
      )}
    </div>
  );
}

export default Home;







