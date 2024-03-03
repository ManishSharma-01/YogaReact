import Header from "../../components/header/header";
import Posts from "../../components/posts/posts";
import "./home.css";

export default function Home() {
  return (
    <>
        <Header/>
        <div className="home">
          <Posts />
        </div>
    </>
  );
}