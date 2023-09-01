import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://site--marvel-backend--4xcmgcydfhpz.code.run/Login",
              {
                email,
                password,
              }
            );
            console.log(response.data);
            handleToken(response.data.token);
            navigate("/");
          } catch (error) {
            alert(
              "Vous avez saisi un mauvais e-mail ou mot de passe ! Si vous n'avez pas de compte, inscrivez-vous."
            );

            console.log(error.response.data);
          }
        }}
      >
        <h1 className="connect">Se connecter</h1>
        <br />
        <div>
          <div className="input-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Link className="connexion" to="/comics">
              <button className="connet"> Se connecter</button>
            </Link>
            <br />
            <Link className="name" to="/signup">
              {" "}
              Pas encore de compte ? Inscris-toi !
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
