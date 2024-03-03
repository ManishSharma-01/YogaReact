import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import pic from "../src/assets/images/sidebar.jpeg";
import "./settings.css";

export default function Setting() {
  const [user, setUser] = useState(null);
  const [ setUsername] = useState('');
  const [ setEmail, setFirstName, setLastName, setGender, setAge] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    // Fetching user details from the backend using the getMe API endpoint
    const fetchUserDetails = async () => {
      try {
        // Get the bearer token from local storage
        const token = localStorage.getItem('token');

                // Decoding the JWT token to get the user ID
                const decodedToken = parseJwt(token);
                const userId = decodedToken ? decodedToken.id : null;
        
                if (!userId) {
                  // Handling the case where the token is invalid or missing user ID
                  console.error('Invalid token or missing user ID');
                  return;
                }

        // Set the request headers with the bearer token
        const headers = {
          'Authorization': 'Bearer '+token,
        };

        // Make the API call with the headers
        const response = await axios.get('http://localhost:3001/users/getMe/'+userId, { headers });

        // Assuming the response contains the user details, update the state
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
      // Function to decode the JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };


    fetchUserDetails();
  }, []);

  return (
    <>
    <div className="settings">
      <div className="settingsWrapper">
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            {user && user.image ? (
              <img crossorigin="anonymous" src={'http://localhost:3001/uploads/' + user.image} alt="" />
            ) : (
              <img 
              // src={pic}
              alt="" />
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-user"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>

          <label>Username</label>
          {user && <input type="text" value={user.username} placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} />}

          <label>Email</label>
          {user && <input type="text" value={user.email} placeholder="email@gmail.com"
            onChange={(e) => setEmail(e.target.value)} />}


          <label>First Name</label>
          {user && <input type="text" value={user.firstname} placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)} />}

          <label>Last Name</label>
          {user && <input type="text" value={user.lastname} placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)} />}

          <label>Gender</label>
          {user && <input type="text" value={user.gender} placeholder="Gender"
            onChange={(e) => setGender(e.target.value)} />}

          <label>Age</label>
          {user && <input type="text" value={user.age} placeholder="Age"
            onChange={(e) => setAge(e.target.value)} />}


          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="buttonContainer">
            <button className="settingsSubmit">Update</button>
            <button className="settingsDelete">Delete Account</button>
          </div>
        </form>
      </div>
    </div></>
  )
}
