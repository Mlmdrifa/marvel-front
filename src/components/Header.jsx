import Image from "../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ search, setSearch, token, handleToken }) => {
  const { pathname } = useLocation();
  const searchBar = ["/comics", "/characters"].includes(pathname);
  // const searchBar = pathname  "comics" || pathname === "characters";
  console.log(" serchbar===>", searchBar);
  console.log(pathname);
  return (
    <header className="header">
      {/* LOGO */}
      <Link to="/" className="menu">
        <img className="logo" src={Image} alt="logo" />
      </Link>

      {/* BARRE DE RECHERCHE */}

      {searchBar && (
        <input
          className="search-input"
          type="text"
          value={search}
          placeholder=" Search"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      )}

      {/* BOUTTONS */}

      {/* COMICS */}
      <div className="header-button">
        <Link to={"/comics"} key={name._id}>
          <button>Comics</button>
        </Link>

        {/* CHARACTERS */}
        <Link to={`/characters`} key={name._id}>
          <button>Personnages</button>
        </Link>
        <div>
          <div className="login-sign">
            {token ? (
              <>
                <Link to={"/login"}>
                  <button
                    onClick={() => {
                      handleToken(null);
                    }}
                  >
                    Se déconnecter
                  </button>
                </Link>
              </>
            ) : (
              <span
                onClick={() => {
                  setToken(null);
                  Cookies.remove("token");
                  Cookies.remove("username");
                  history.push("/");
                }}
              >
                <Link to={"/login"}>
                  <button>Se connecter</button>
                </Link>
                <Link to={"/signup"}>
                  <button>S'inscrire</button>
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
