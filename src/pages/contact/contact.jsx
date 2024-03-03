import React from 'react';
import "./contact.css";

export default function Contact() {
  return (
    <>

    <div className="contactUsContainer">
      <div className="contactForm">
        <h1>Contact Us</h1>
        <form className="formGroup">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="stayConnected">
        <h2>Stay connected with us</h2>
        <div className="socialIcons">
          <a href="https://www.facebook.com">
            <i className="topIcon fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com">
            <i className="topIcon fa-brands fa-instagram"></i>
          </a>
          <a href="https://twitter.com">
            <i className="topIcon fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com">
            <i className="topIcon fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div></>
  );
}
