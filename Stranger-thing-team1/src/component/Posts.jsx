import  { useState, useEffect } from 'react';
import { getAllPosts } from '../API/index'; // Update the path to match your directory structure

function Profile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInitialPosts() {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
        setIsLoading(false);
      }
    }

    fetchInitialPosts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching posts</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Initial Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <p> {post.username}</p>
            <p> Title:{post.title}</p>
            <p> Description: {post.description}</p>
            <p> Price: {post.price}</p>
            <p> Location:{post.location}</p>
            <p> Delivery: {post.willDeliver}</p>
            </li>
          
          
        ))}
      </ul>
    </div>
  );
}

export default Profile;
