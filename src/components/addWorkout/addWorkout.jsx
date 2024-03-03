import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './addWorkout.css';

const AddWorkout = () => {
  const [workoutData, setWorkoutData] = useState({
    // _id: '',
    title: '',
    nameOfWorkout: '',
    numberOfReps: '',
    day: '',
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { _id, title, nameOfWorkout, numberOfReps, day, image } = location.state;
      setWorkoutData({
        _id,
        title,
        nameOfWorkout,
        numberOfReps,
        day,
        image,
      });
      setSelectedImage(`http://localhost:3001/uploads/${image}`);
    }
  }, [location.state]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profilePicture', workoutData.image);
      const response = await axios.post('http://localhost:3001/workouts/uploadImage', formData);
      setWorkoutData((prevData) => ({
        ...prevData,
        image: response.data.data,
      }));
      console.log('Image uploaded successfully:', response.data.data);
    } catch (error) {
      console.error('Error uploading image:', error.response.data);
    }
  };
  // const handleImageUpload = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('profilePicture', workoutData.image); // Correct key for FormData
  
  //     const response = await axios.post('http://localhost:3001/workouts/uploadImage', formData);
  
  //     setWorkoutData((prevData) => ({
  //       ...prevData,
  //       image: response.data.data,
  //     }));
  
  //     console.log('Image uploaded successfully:', response.data.data);
  //   } catch (error) {
  //     console.error('Error uploading image:', error.response.data);
  //   }
  // };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !workoutData.title ||
        !workoutData.nameOfWorkout ||
        !workoutData.numberOfReps ||
        !workoutData.day ||
        !workoutData.image
      ) {
        alert('Please fill in all the required fields.');
        return;
      }

      const token = window.localStorage.getItem('token');

      if (workoutData._id) {
        const response = await axios.put(
          `http://localhost:3001/workouts/updateWorkout/${workoutData._id}`,
          workoutData,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        console.log('Workout updated successfully:', response.data);
        toast.success('Workout updated successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else {
        const response = await axios.post('http://localhost:3001/workouts/addWorkout', workoutData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log('Workout added successfully:', response.data);
        toast.success('Workout added successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
        });
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding/updating workout:', error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setWorkoutData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
    setSelectedImage(URL.createObjectURL(imageFile));
  };

  return (
    <div className="write">
      <img crossorigin="anonymous" className="writeImg" src={selectedImage || "pic"} alt="" />
      <form className="writeForm" onSubmit={handleFormSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button onClick={handleImageUpload}>Upload Image</button>
        </div>

        <div className="writeFormGroup">
          <label>Title</label>
          <input
            placeholder="Title"
            name="title"
            type="text"
            className="writeInput"
            autoFocus={true}
            value={workoutData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="writeFormGroup">
          <label>Name of Workout</label>
          <input
            placeholder="Name of Workout"
            name="nameOfWorkout"
            type="text"
            className="writeInput writeText"
            value={workoutData.nameOfWorkout}
            onChange={handleInputChange}
          />
        </div>

        <div className="writeFormGroup">
          <label>Number of Reps</label>
          <input
            placeholder="Number of Reps"
            name="numberOfReps"
            type="text"
            className="writeInput writeText"
            value={workoutData.numberOfReps}
            onChange={handleInputChange}
          />
        </div>

        <div className="writeFormGroup">
          <label>Day</label>
          <input
            placeholder="Day"
            name="day"
            type="text"
            className="writeInput writeText"
            value={workoutData.day}
            onChange={handleInputChange}
          />
        </div>

        <button className="writeSubmit" type="submit">
          {location.state ? 'Update Workout' : 'Add Workout'}
        </button>
      </form>
      <br />
    </div>
  );
};

export default AddWorkout;
