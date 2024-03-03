import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './singlePost.css';

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const workoutResponse = await axios.get(`http://localhost:3001/workouts/getWorkout/${postId}`, { headers });
        const workoutData = workoutResponse.data.data;

        setPost(workoutData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const decodedToken = parseJwt(token);
      const userId = decodedToken ? decodedToken.id : null;

      const payload = {
        workout: postId,
        user: userId,
      };

      await axios.post('http://localhost:3001/routines/create', payload, { headers });

      toast.success('Added to your routine!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:3001/workouts/deleteWorkout/${postId}`, { headers });

      toast.error('Workout deleted!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
      });

      navigate('/workout');
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/addWorkout`, { state: post });
  };

  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          crossOrigin='anonymous'
          src={`http://localhost:3001/uploads/${post.image}`}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}

          <div className="singlePostEdit">
            {post ? (
              <>
                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={handleEdit}></i>
                <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
              </>
            ) : null}
          </div>
        </h1>
        <div className="singlePostInfo">
          {/* <span className="singlePostAuthor">Author: <b>Inish Bashyal</b></span>
          <span className="singlePostDate">1 hour ago</span> */}
        </div>
        <p className="singlePostDesc">
          Name of Workout : {post.nameOfWorkout}
          <br />
          Number of Reps : {post.numberOfReps}
          <br />
          Day : {post.day}
        </p>
      </div>
      <button className="workoutFollow" onClick={handleFollow}>Follow</button>
      <button className="back">
        <Link to='/workout' >Get Back</Link>
      </button>
    </div>
  )
}