import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import './routine.css';

export default function Routine() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);

  useEffect(() => {
    // Function to fetch routines from the API
    const fetchRoutines = async () => {
      try {
        // Get the bearer token from local storage
        const token = localStorage.getItem('token');

        // Set the request headers with the bearer token
        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        // Fetch routines data from the API
        const response = await axios.get('http://localhost:3001/routines/myRoutines', { headers });

        // Assuming the response contains the list of routines with workout details, set the routines in the state
        setRoutines(response.data.routines);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching routines:', error);
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  const markAsComplete = async (routineId) => {
    try {
      // Get the bearer token from local storage
      const token = localStorage.getItem('token');
  
      // Set the request headers with the bearer token
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
  
      // Make API request to update routine status to 'Completed'
      await axios.put(`http://localhost:3001/routines/update/${routineId}`, 
        { routineStatus: 'Completed', completedAt: new Date().toISOString() }, 
        { headers }
      );
  
      // Update the routine status and completedAt in the state
      setRoutines((prevRoutines) =>
        prevRoutines.map((routine) =>
          routine._id === routineId
            ? { ...routine, routineStatus: 'Completed', completedAt: new Date().toISOString() }
            : routine
        )
      );
  
      // Display notification for marking routine as complete
      toast.success('Routine marked as completed!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
      });    
    } catch (error) {
      console.error('Error marking routine as complete:', error);
    }
  };

  const deleteRoutine = async (routineId) => {
    try {
      setShowModal(true); // Show the modal confirmation
      setRoutineToDelete(routineId); // Store the routineId to be deleted
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const confirmDeleteRoutine = async () => {
    try {
      // Get the bearer token from local storage
      const token = localStorage.getItem('token');

      // Set the request headers with the bearer token
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      // Make API request to delete the routine
      await axios.delete(`http://localhost:3001/routines/delete/${routineToDelete}`, { headers });

      // Update the routines list in the state by filtering out the deleted routine
      setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine._id !== routineToDelete));

      // Close the modal
      setShowModal(false);

      // Display notification for routine deletion
      toast.error('Routine deleted!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='routines'>
      <h2>Your Routines</h2>
      {routines.length === 0 ? (
        <p>No routines found.</p>
      ) : (
        <ul className='routinesList'>
          {routines.map((routine) => (
            <li className='listRoutine' key={routine._id}>
              <div>
                {/* Display the workout image if available */}
                {routine.workout && routine.workout.image && (
                  <img crossorigin="anonymous" src={`http://localhost:3001/uploads/${routine.workout.image}`} alt="Workout" />
                )}
              </div>
              <div>
                {routine.workout ? (
                  <React.Fragment>
                    <h3>{routine.workout.title}</h3>
                    <p>Name of Workout: {routine.workout.nameOfWorkout}</p>
                    <p>Number of Reps: {routine.workout.numberOfReps}</p>
                    <p>Day: {routine.workout.day}</p>
                  </React.Fragment>
                ) : (
                  <p>Workout details not available.</p>
                )}
                <p>Status: {routine.routineStatus}</p>
                <p>Enrolled At: {routine.enrolledAt}</p>
                {routine.completedAt && <p>Completed At: {routine.completedAt}</p>}
                {!routine.completedAt && routine.routineStatus !== 'Completed' && (
                  <button className='completeButton' onClick={() => markAsComplete(routine._id)}>Mark as Complete</button>
                )}
                <button className='deleteButton' onClick={() => deleteRoutine(routine._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className='modal'>
          <p>Are you sure you want to delete this routine?</p>
          <button className='modalButton' onClick={confirmDeleteRoutine}>Yes</button>
          <button className='modalButton' onClick={() => setShowModal(false)}>No</button>
        </div>
      )}
    </div>
  );
}
