import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to the home page or login page
    window.location.href = "/";
  };

  console.log("userDataLoaded:", userDataLoaded);
  console.log("user:", user);


  const location = useLocation(); // Get the current route location

  // Check if the current route matches the paths of Login and Register pages
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";

  // Conditionally render the TopBar based on the route
  if (isLoginPage || isRegisterPage) {
    return null;

  }

  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://www.facebook.com">
          <i className="topIcon fa-brands fa-square-facebook"></i>
        </a>
        <a href="https://www.instagram.com">
          <i className="topIcon fa-brands fa-square-instagram"></i>
        </a>
        <a href="https://twitter.com">
          <i className="topIcon fa-brands fa-square-twitter"></i>
        </a>
        <a href="https://www.linkedin.com">
          <i className="topIcon fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/dashboard">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/workout">
              Available Plans
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/routines">
            Your Routines
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/aboutUs">
              About Us
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contactUs">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        <div className="dropdown">
          {userDataLoaded && user ? ( 
            user.image ? (
              <img
                className="topImg"
                crossorigin="anonymous"
                src={"http://localhost:3001/uploads/" + user.image}
                alt=""
                onClick={toggleDropdown}
              />
            ) : (
              <img
                className="topImg"
                src={user.image}
                alt=""
                onClick={toggleDropdown}
              />
            )
          ) : null}
          {dropdownOpen && (
            <div className="dropdownContent">
              <Link to="/settings">Update Account</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}