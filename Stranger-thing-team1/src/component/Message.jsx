import React, { useState, useEffect } from 'react';
import { sendMessage } from '../API/index';
import { useParams } from 'react-router-dom';
import { getAllPostsAuthenticated } from '../API/index';

function Message() {
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false); // New state for success flag
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);
  const token = sessionStorage.getItem('token');

  // Fetch post details when component mounts
  useEffect(() => {
    async function fetchInitialPosts() {
      try {
        let fetchedPosts;

        if (token) {
          fetchedPosts = await getAllPostsAuthenticated(token);
        }
        console.log('Fetched posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchInitialPosts();
    
  }, [token]);

  const handleSendMessage = async () => { // No need for postId here
   
    try {
      const result = await sendMessage(postId, message, token);
      console.log("API response:", result);
      if (result.success) {
        setSuccess(true); // Set success flag to true
        setMessageSuccess("Message sent successfully");
        setTimeout(() => {
          setMessageSuccess("");
          setSuccess(false); // Reset success flag after a delay
        }, 5000);
      } else {
        console.error("Error sending message:", result.message);
        setSuccess(false); // Set success flag to false on error
      }
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setSuccess(false); // Set success flag to false on error
    }
  };

  return (
    <div>
      {success && (
        <p className="success-message">Message sent successfully</p>
      )}
      {posts.map(post => {
        if (post._id === postId) {
          return (
            <div key={post._id} className="post-details">
              <p className="post-username">{post.username}</p>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <p className="post-price">Price: {post.price}</p>
              <p className="post-location">Location: {post.location}</p>
              <p className="post-delivery">Delivery: {post.willDeliver}</p>
            </div>
          );
        }
        return null;
      })}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
        />
        <button type="submit">Send Message</button>
      </form>
      {messageSuccess && <p className="success-message">{messageSuccess}</p>}
    </div>
  );
}

export default Message;



// import { useState, useEffect } from 'react';
// import { sendMessage } from '../API/index';
// import { useParams } from 'react-router-dom';
// import { getAllPostsAuthenticated } from '../API/index';

// function Message() {
//   const [message, setMessage] = useState("");
//   const [messageSuccess, setMessageSuccess] = useState("");
//   const { postId } = useParams();
//  const [posts, setPosts] = useState([]);
//   const token = sessionStorage.getItem('token');

//   // Fetch post details when component mounts
//   useEffect(() => {
//     async function fetchInitialPosts() {
//       try {
//         let fetchedPosts;

//         if (token) {
        
//           fetchedPosts = await getAllPostsAuthenticated(token);
//         } 
//         console.log('Fetched posts:', fetchedPosts);
//         setPosts(fetchedPosts);
      
//       } catch (error) {
//         console.error("Error fetching posts:", error);
       
       
//       }
//     }

//     fetchInitialPosts();
//   }, [token]); 

//   const handleSendMessage = async (postId) => {
  
//     try {
//       const result = await sendMessage(postId, message, token);
//       if (result.success) {
//         setMessageSuccess("Message sent successfully");
//         setTimeout(() => {
//           setMessageSuccess("");
//         }, 5000);
//       } else {
//         console.error("Error sending message:", result.message);
//       }
//       setMessage(""); 
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//   <div>
//     {posts.map(post => {
//       if (post._id === postId) {
//         return (
//           <div key={post._id} className="post-details">
//             <p className="post-username">{post.username}</p>
//             <h3 className="post-title">{post.title}</h3>
//             <p className="post-description">{post.description}</p>
//             <p className="post-price">Price: {post.price}</p>
//             <p className="post-location">Location: {post.location}</p>
//             <p className="post-delivery">Delivery: {post.willDeliver}</p>
//           </div>
//         );
//       }
//       return null;
//     })}
//     <form onSubmit={handleSendMessage}>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Your message..."
//       />
//       <button type="submit">Send Message</button>
//     </form>
//     {messageSuccess && <p className="success-message">{messageSuccess}</p>}
//   </div>
// );
// }

// export default Message;


// import { useState } from 'react';
// import { sendMessage } from '../API/index';
// import { useParams } from 'react-router-dom';

// function Message() {
//   const [message, setMessage] = useState("");
//   const [messageSuccess, setMessageSuccess] = useState("");
//   const { postId } = useParams();

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     try {
//          console.log("postId:", postId); // Log postId
//       const token = sessionStorage.getItem('token');
//       console.log("token:", token); // Log token
//       console.log("message:", message); // Log message
//       const result = await sendMessage(postId, message, token);
//       if (result.success) {
//         setMessageSuccess("Message sent successfully");
//         setTimeout(() => {
//           setMessageSuccess("");
//         }, 5000);
//       } else {
//         console.error("Error sending message:", result.message);
//       }
//       setMessage(""); 
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Your message..."
//         />
//         <button type="submit">Send Message</button>
//       </form>
//       {messageSuccess && <p className="success-message">{messageSuccess}</p>}
//     </div>
//   );
// }

// export default Message;