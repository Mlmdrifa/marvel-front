import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// import de mes composants REACT !!!!!

import Header from "./components/Header";
import Comics from "./Pages/Comics";

import Characters from "./Pages/Characters";
import Favoris from "./Pages/Favoris";
import Character from "./Pages/Character";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

//  TOKEN
const token = Cookies.get("token");

// const Login = (token, username) => {
//   setToken(token);
//   setUsername(username);
//   Cookies.set("token", token);
//   Cookies.set("username", username);
// };

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(Cookies.get("favorites") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  // UTILISATEUR

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  // FAV
  const handleFavorites = (favorites) => {
    if (favorites) {
      Cookies.set("favorites", favorites, { expires: 10 });
      setFavorites(favorites);
    } else {
      Cookies.remove("favorites");
      setFavorites(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Router>
        <div className="opacity">
          <Header
            {...{ search, setSearch }}
            setUser={setUser}
            token={token}
            handleToken={handleToken}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/comics"
              element={<Comics search={search} setSearch={setSearch} />}
            />
            <Route
              path="/characters"
              element={<Characters search={search} setSearch={setSearch} />}
            />
            <Route
              path="/comics/:comicId"
              element={<Comics handleFavorites={handleFavorites} />}
            />
            <Route path="/comics/:characterId" element={<Character />} />

            {/* {/* <Route
              path="/Favoris"
              element={
                <Favoris
                  handleToken={handleToken}
                  handleFavorites={handleFavorites}
                />
              } */}

            <Route
              path="/signup"
              element={<Signup handleToken={handleToken} />}
            />
            <Route
              path="/login"
              element={<Login handleToken={handleToken} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
