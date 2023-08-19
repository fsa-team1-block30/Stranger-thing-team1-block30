import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getAllPostsAuthenticated, deletePost } from '../API/index';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    async function fetchInitialPosts() {
      try {
        let fetchedPosts;

        if (token) {
          fetchedPosts = await getAllPostsAuthenticated(token);
        } else {
          fetchedPosts = await getAllPosts();
        }
        console.log('Fetched posts:', fetchedPosts);
        setPosts(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error);
        setIsLoading(false);
      }
    }

    fetchInitialPosts();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching posts</p>;
  }

  function postMatches(post, text) {
  const fieldsToCheck = ['username', 'title', 'description', 'price', 'location', 'willDeliver'];
  return fieldsToCheck.some((field) =>
    typeof post[field] === 'string' && post[field].toLowerCase().includes(text.toLowerCase())
  );
}

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  const handleDelete = async (postId) => {
    try {
      const result = await deletePost(postId, token);
      if (result.success) {
        setPosts(posts.filter((post) => post._id !== postId));
        console.log(result.message);
      } else {
        console.error('Error deleting post:', result.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

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
      {/* Search form */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {postsToDisplay.map((post) => (
          <li key={post._id} className="post-item">
            <p className="post-username">{post.username}</p>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>
            <p className="post-price">Price: {post.price}</p>
            <p className="post-location">Location: {post.location}</p>
            <p className="post-delivery">Delivery: {post.willDeliver}</p>
            {post.isAuthor || token ? (
              <div>
                {post.isAuthor && <p>You are the author of this post.</p>}
                {token && !post.isAuthor && (
                  <Link to={`/post/${post._id}`} className="button-link">
                    Message
                  </Link>
                )}
                {post.isAuthor && (
                  <button onClick={() => handleDelete(post._id)} className="delete">
                    Delete
                  </button>
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


// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllPosts, getAllPostsAuthenticated, deletePost} from '../API/index';


// function Posts() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = sessionStorage.getItem('token');


//   useEffect(() => {
//     async function fetchInitialPosts() {
//       try {
//         let fetchedPosts;

//         if (token) {
        
//           fetchedPosts = await getAllPostsAuthenticated(token);
//         } else {
         
//           fetchedPosts = await getAllPosts();
//         }
//         console.log('Fetched posts:', fetchedPosts);
//         setPosts(fetchedPosts);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setError(error);
//         setIsLoading(false);
//       }
//     }

//     fetchInitialPosts();
//   }, [token]); 

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error fetching posts</p>;
//   }


// const handleDelete = async (postId) => {
//     try {
//       const result = await deletePost(postId, token);
//       if (result.success) {
//         setPosts(posts.filter(post => post._id !== postId));
//         console.log(result.message); 
//       } else {
//         console.error("Error deleting post:", result.message);
//       }
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   return (
//     <div className="posts-container">
//       <div className="header-container">
//         <h1 className="h1-post">Posts</h1>
//         {token && (
//           <Link className="add-post-button" to="/NewListing">
//             Add New Post
//           </Link>
//         )}
//       </div>
//       <ul>
//         {posts.map(post => (
          
//           <li key={post._id} className="post-item">
//       <p className="post-username">{post.username}</p>
//       <h3 className="post-title">{post.title}</h3>
//       <p className="post-description">{post.description}</p>
//       <p className="post-price">Price: {post.price}</p>
//       <p className="post-location">Location: {post.location}</p>
//       <p className="post-delivery">Delivery: {post.willDeliver}</p>
      
//             {post.isAuthor || token ? (
//               <div>
//                 {post.isAuthor && <p>You are the author of this post.</p>}
//                 {token && !post.isAuthor && (
//                   <Link to={`/post/${post._id}`} className="button-link">Message</Link>
//                 )}
//                  {post.isAuthor && (
//                   <button onClick={() => handleDelete(post._id)} className="delete" >Delete</button>
//                 )}
                
                
//               </div>
//             ) : null}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Posts;
