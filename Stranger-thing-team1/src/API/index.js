const COHORT_NAME = '2302-acc-pt-web-pt-d';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// Function to make a GET request to fetch all posts
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    console.log("get post:", data)
    
    return data.data.posts; 
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const registerUser = async (registrationData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: registrationData
      })
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
  console.error("Error registering user:", err);
  if (err.response) {
    console.error("Response Status:", err.response.status);
    console.error("Response Data:", await err.response.json());
  }
  throw err;
}
};


export const loginUser = async (loginData) => {

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: loginData
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }