import React from 'react';
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerLeft">
          <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
        </div>s
      </div>
    </footer>
  );
}
