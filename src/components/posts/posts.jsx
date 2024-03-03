/* Posts.js */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './posts.css';

export default function Posts() {
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get('http://localhost:3001/workouts/getAllWorkouts', { headers });
        setWorkoutData(response.data.data);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchWorkoutData();
  }, []);

  return (
    <div className="workoutContainer">
      {workoutData &&
        workoutData.map((workout) => (
          <Link key={workout._id} className="link" to={`/post/${workout._id}`}>
            <div className="post">
              <div className="postImageContainer">
                <img
                  className="postImg"
                  crossOrigin="anonymous"
                  src={`http://localhost:3001/uploads/${workout.image}`} // Use the API URL for the image
                  alt=""
                />
                <span className="postTitle">{workout.title}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
