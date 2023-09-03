import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="hero">
        <Link to="/comics">
          <button className="hero-b"> Welcome to Marvel Comics !</button>
        </Link>
      </div>
    </>
  );
};
export default Home;
