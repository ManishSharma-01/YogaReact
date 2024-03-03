import { Link } from "react-router-dom";
import pic from "../../assets/images/post.jpeg";
import "./post.css";

export default function Post() {
  return (
    <Link className="link" to="/post">
    <div className="post">
      <img className="postImg"
      src={pic}
      alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Author</span>
        </div>

        <span className="postTitle">
          A photo of a exercise
        </span>
        <hr />
        <span className="postDate">1 hr ago</span>
      </div>
      <p className="postDesc">
        This photo consists of a two people doing exercise. It is a bright day as sun rays can be seen through the window. Exercise Description.
        </p>
    </div>
    </Link>
  )
}