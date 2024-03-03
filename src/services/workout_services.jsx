import axios from "axios"

const baseUrl = 'http://localhost:3001/workouts'

const getToken = () => `bearer ${window.localStorage.getItem('token')}`

const getAllWorkouts = () => {
    return axios.get(baseUrl, {
        headers: { Authorization: getToken() }
    })
}

const addWorkout = (newNote) => {
    return axios.post(baseUrl, newNote, {
        headers: { Authorization: getToken() }
    })
}

const updateWorkout = (noteId, updatedContent) => {
    return axios.put(`${baseUrl}/${noteId}`, updatedContent, {
        headers: { Authorization: getToken() }
    })
}

const deleteWorkout = (noteId) => {
    return axios.delete(`${baseUrl}/${noteId}`, {
        headers: { Authorization: getToken() }
    })
}

const noteService = {
    getAllWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout
}

export default workoutService