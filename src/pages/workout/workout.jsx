import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Posts from '../../components/posts/posts';
import './workout.css';

export default function Workout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
    <div className='searchTop'>
    <div className="searchBar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..." />
          
          {user && user.role === 'Trainer' ? (
            <button className="WorkoutButton" type="button">
              <Link className="link" to="/addWorkout">
                Add Workout
              </Link>
            </button>
          )
          :
          (
            <button className="WorkoutButton" type="button">
              Search
            </button>
              )}
      </div>

    </div>
    <div className="workoutContainers">

      <Posts />
    </div></>
  );
}
