import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const handleImageUpload = () => {
    // Trigger the file input element when the user clicks on the user icon
    document.getElementById("imageInput").click();
  };

  return (
    <div className="register">

      <span className="registerTitle">Register</span>

      <div className="registerForm">
        <div className="formGroup">
          <div className="imageUpload" onClick={handleImageUpload}>
            <i className="fa fa-user"></i>
            <input id="imageInput" className="hidden" type="file" accept="image/*" />
          </div>
        </div>

        <div className="formGroup">
          <label>First Name</label>
          <input className="registerInput" type="text" placeholder="Enter your first name" />
        </div>

        <div className="formGroup">
          <label>Last Name</label>
          <input className="registerInput" type="text" placeholder="Enter your last name" />
        </div>

        <div className="formGroup">
          <label>Username</label>
          <input className="registerInput" type="text" placeholder="Enter your username" />
        </div>

        <div className="formGroup">
          <label>Age</label>
          <input className="registerInput" type="number" placeholder="Enter your age" />
        </div>

        <div className="formGroup">
          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter your email" />
        </div>

        <div className="formGroup">
          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter your password" />
        </div>

        <div className="formGroup">
          <label>Gender</label>
          <div className="genderOptions">
            <label>
              <input type="radio" name="gender" value="male" />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="other" />
              Other
            </label>
          </div>
        </div>

        <button className="registerButton">
  <Link className="link" to="/register">
    REGISTER
  </Link>
</button>

      </div>

      <button className="registerLoginButton">
        <Link className="link" to="/">LOGIN</Link>
      </button>
    </div>
  )
}
