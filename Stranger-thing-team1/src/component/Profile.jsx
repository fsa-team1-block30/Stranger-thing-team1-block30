import { useState, useEffect } from 'react';
import { getUserProfile, } from '../API/index';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        if (token) {
          const userProfile = await getUserProfile(token);
          console.log("userProfile", userProfile);
          if (userProfile.success) {
            setUser(userProfile.data); // Assuming userProfile.data contains user data
          } else {
            setError(userProfile.error); // Set error message if API call was unsuccessful
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("An error occurred while fetching user profile.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username || 'User'}!</h2>
          {user.messages && user.messages.length > 0 ? (
            <div>
              <h3>Messages from Me:</h3>
              <ul>
                {user.messages.map((message) => (
                  <li key={message._id}>
                    <p>Message: {message.content}</p>
                    <p>Post Title: {message.post.title}</p>
                     <Link to={`/post/:postId/message`}>Message again</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No messages available.</p>
          )}

          {user.posts && user.posts.length > 0 ? (
            <div>
              <h3>Your Posts</h3>
              <ul>
                {user.posts.map((post) => (
                  <li key={post._id}>
                   <p>{post.title}</p> 
                    <p>{post.description}</p>{post.description}
                   <p><Link to={`/post/${post._id}/message`}>View Details</Link></p> 

                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      ) : (
        <p>No user profile available.</p>
      )}
    </div>
  );
}

export default Profile;
