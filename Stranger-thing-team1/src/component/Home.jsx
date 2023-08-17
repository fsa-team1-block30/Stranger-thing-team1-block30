import React, { useState, useEffect } from 'react';
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
      {username && (
        <React.Fragment>
          <p className="welcome-message">Welcome to Stranger's Things, <span className="emphasized">{username}</span>!</p>
          <button className="profile-button" onClick={() => navigate('/profile')}>Go to Profile</button>
        </React.Fragment>
      )}
    </div>
  );
}

export default Home;







