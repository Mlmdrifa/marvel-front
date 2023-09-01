import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// import de mes pages

import Header from "./components/Header";
import Comics from "./Pages/Comics";
import Characters from "./Pages/Characters";
import Favoris from "./Pages/Favoris";
import Character from "./Pages/Character";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

const token = Cookies.get("token");
function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
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
          <Header {...{ search, setSearch }} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setUser={setUser}
                  token={token}
                  handleToken={handleToken}
                />
              }
            />
            <Route
              path="/comics"
              element={<Comics search={search} setSearch={setSearch} />}
            />
            <Route
              path="/Characters"
              element={
                <Characters
                  search={search}
                  setSearch={setSearch}
                  skip={skip}
                  setSkip={setSkip}
                  limit={limit}
                  setLimit={setLimit}
                />
              }
            />
            <Route path="/comics/:characterId" element={<Character />} />
            <Route path="/Favoris" element={<Favoris />} />
            <Route
              path="/Signup"
              element={<Signup handleToken={handleToken} />}
            />
            <Route
              path="/Login"
              element={<Login handleToken={handleToken} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
