import pic from "../../assets/images/logo.png";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        {/* <span className="headerTitleSm">React & Node</span> */}
        <span className="headerTitleLg">Welcome to our online Yoga Buddy</span>
        <span className="headerTitleSm">Today's poses</span>
      </div>
      <img
      className="headerImg"
      src={pic}
        alt="" />
    </div>
  )
}