import { useState, useEffect } from 'react';

function Home() {
const [username, setUsername] = useState('');

   useEffect(() => {
    // Retrieve username from sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      {username && <p>Welcome, {username}!</p>}
   
    </div>
  );
}

export default Home;





