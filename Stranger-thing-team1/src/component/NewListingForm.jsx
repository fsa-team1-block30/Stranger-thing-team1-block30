import { useState } from 'react';
import { makePost, makeHeaders } from '../API/index';
import { useNavigate } from 'react-router-dom';


function NewListingForm() {
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const headers = makeHeaders(); 

    const listingData = {
      location,
      willDeliver,
      title,
      description,
      price,
    };

    try { 

        const token = sessionStorage.getItem('token');
        
        console.log("Token New listing from:", token); 
        console.log("Headers New listing from:", headers);
      const newListing = await makePost(listingData,token, headers);
      console.log('New listing created:', newListing);

       if (newListing) {
        setIsSuccessful(true);
        navigate ('/posts');
      }
     
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };
  return (

    <div>
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <h1 className="h1-add"> Add New Post</h1>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="willDeliver">Will Deliver:</label>
        <input
          type="checkbox"
          id="willDeliver"
          checked={willDeliver}
          onChange={(e) => setWillDeliver(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
    
</div>
  );
}

export default NewListingForm;
