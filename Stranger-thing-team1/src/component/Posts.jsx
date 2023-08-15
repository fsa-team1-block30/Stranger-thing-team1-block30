import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../API/index';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

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
    <div className="posts-container">
      <div className="header-container">
        <h1 className="h1-post">Posts</h1>
        {token && (
          <Link className="add-post-button" to="/NewListing">
            Add New Post
          </Link>
        )}
      </div>
      <h2>Initial Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <p>{post.username}</p>
            <p>Title: {post.title}</p>
            <p>Description: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Location: {post.location}</p>
            <p>Delivery: {post.willDeliver}</p>
            {post.isAuthor || token ? (
              <div>
                {post.isAuthor && <p>You are the author of this post.</p>}
                {post.messages && post.messages.length > 0 && (
                  <div>
                    <h3>Messages:</h3>
                    <ul>
                      {post.messages.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
