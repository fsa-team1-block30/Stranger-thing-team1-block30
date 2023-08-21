import  { useState, useEffect } from 'react';
import { getUserProfile } from '../API/index';
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
            setUser(userProfile.data); 
          } else {
            setError(userProfile.error); 
          }
        }
      } catch (error) {
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

  const sentMessages = user.messages.filter(message => message.fromUser._id === user._id);
  const receivedMessages = user.messages.filter(message => message.fromUser._id !== user._id);

  return (
    <div className='profile-container'>
      
      {user ? (
        <div className='user-info'>
          <h2 className='welcome-message'>Welcome, {user.username || 'User'}!</h2>
          
          {/* Sent Messages */}
          {sentMessages && sentMessages.length > 0 ? (
            <div className='message-section'>
              <h3 className='message-heading'>Messages from Me:</h3>
              <ul className='message-list'>
                {sentMessages.map((message) => (
                  <li key={message._id} className='message-item'>
                    <p className='message-content'>Message: {message.content}</p>
                    <p className='post-title'>Post Title: {message.post.title}</p>
                    <Link to={`/post/${message.post._id}/message`} className='message-link'>Message again</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No messages available.</p>
          )}

          {/* Received Messages */}
          {receivedMessages && receivedMessages.length > 0 ? (
            <div className='message-section'>
              <h3 className='message-heading'>Messages to Me:</h3>
              <ul className='message-list'>
                {receivedMessages.map((message) => (
                  <li key={message._id} className='message-item'>
                    <p className='message-content'>Message: {message.content}</p>
                    <p className='message-sender'>Sender: {message.fromUser.username}</p>
                    <p className='post-title'>Post Title: {message.post.title}</p>
                    <Link to={`/post/${message.post._id}/message`} className='message-link'>Reply</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No messages sent to you.</p>
          )}

          {/* User's Posts */}
          {user.posts && user.posts.length > 0 ? (
            <div className='user-posts'>
              <h3 className='user-posts-heading'>Your Posts</h3>
              <ul className='user-posts-list'>
                {user.posts.map((post) => (
                  <li key={post._id} className='user-post-item'>
                    <p className='post-title'>{post.title}</p>
                    <p className='post-description'>{post.description}</p>
                    <Link to={`/post/${post._id}/message`} className='message-link'>see details</Link>
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




