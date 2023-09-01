import Image from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  return (
    <header className="header">
      <Link to="/" className="menu">
        <img className="logo" src={Image} alt="logo" />
      </Link>
      <input
        className="search-input"
        type="text"
        value={search}
        placeholder=" Search"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div className="header-button">
        {/* <Link to={"/comics"} key={name._id}>
          <button>Comics</button>
        </Link> */}
        {/* <button>Login</button> */}
        {/* <Link to={`/characters/`} key={name._id}>
          <button>Personnages</button>
        </Link> */}

        <button>Contact us</button>
      </div>
    </header>
  );
};

export default Header;
