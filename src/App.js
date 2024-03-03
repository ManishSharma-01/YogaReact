import axios from "axios";
import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import AddWorkout from "./components/addWorkout/addWorkout";
import Footer from "./components/footer/footer";
import PostDetails from "./components/singlePost/singlePost";
import TopBar from "./components/topbar/topbar";
import AboutUs from "./pages/aboutUs/aboutUs";
import Contact from "./pages/contact/contact";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Routine from "./pages/routine/routine";
import Setting from "./pages/settings/settings";
import Single from "./pages/single/single";
import Workout from "./pages/workout/workout";
import { RequireAuth } from './utils/RequireAuth';
import { AuthProvider } from './utils/authContext';

function App() {
  const [ setUser] = useState(null);
  const [ setUserDataLoaded] = useState(false);

  useEffect(() => {
    // Fetching user details from the backend using the getMe API endpoint
    const fetchUserDetails = async () => {
      try {
        // Get the bearer token from local storage
        const token = localStorage.getItem("token");

        console.log("Token:", token);


        // Decoding the JWT token to get the user ID
        const decodedToken = parseJwt(token);
        const userId = decodedToken ? decodedToken.id : null;

        if (!userId) {
          // Handling the case where the token is invalid or missing user ID
          console.error("Invalid token or missing user ID");
          return;
        }

        // Set the request headers with the bearer token
        const headers = {
          Authorization: "Bearer " + token,
        };

        // Make the API call with the headers
        const response = await axios.get(
          "http://localhost:3001/users/getMe/" + userId,
          { headers }
        );

        // Assuming the response contains the user details, update the state
        setUser(response.data.user);
        setUserDataLoaded(true); // Set userDataLoaded to true after fetching user data
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Function to decode the JWT token
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <Router>
            <AuthProvider>

        <TopBar/>

        <Routes>
            <Route exact path="/dashboard" element={<RequireAuth><Home/></RequireAuth>} />

            <Route path="/register" element={<Register/>} />

            <Route path="/" element={<Login/>} />


            <Route path="/settings" element={<RequireAuth><Setting/></RequireAuth>} />

            <Route path="/post/:postId" element={<RequireAuth><Single/></RequireAuth>}/>

            <Route path="/postDetails" element={<PostDetails />} />


            <Route path="/addWorkout" element={<RequireAuth><AddWorkout/></RequireAuth>}/>

            <Route path="/workout" element={<RequireAuth><Workout/></RequireAuth>}/>

            <Route path="/aboutUs" element={<AboutUs/>}/>

            <Route path="/contactUs" element={<Contact/>}/>

            <Route path="/routines" element={<RequireAuth><Routine/></RequireAuth>}/>
              
        </Routes>
        <Footer />
        </AuthProvider>

    </Router>
  );
}

export default App;