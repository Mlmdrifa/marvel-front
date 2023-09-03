import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ handleToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <main className="container">
      <div className="login">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
              const response = await axios.post(
                "https://site--marvel-backend--4xcmgcydfhpz.code.run/Login",
                {
                  email,
                  password,
                }
              );
              Cookies.set("token", response.data.token, { expires: 15 });
              console.log(response.data);

              if (response.data.token) {
                handleToken(response.data.token);
                navigate("/comics");
              }
              setToken(response.data.token);
            } catch (error) {
              alert(
                "Vous avez saisi un mauvais e-mail ou mot de passe ! Si vous n'avez pas de compte, inscrivez-vous."
              );
              console.log(error.response.data);
              setIsLoading(false);
            }
          }}
        >
          <div>
            <h1 className="connect-login"> Se connecter</h1>
            <br />
            <div>
              <input
                className="connect"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                className="connect"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <button
                className="sedconncer-sincrire"
                type="submit"
                value="Se connecter"
              >
                Se connecter
              </button>

              <br />
              <Link className="connect" to="/signup">
                Pas encore de compte ? Inscris-toi !
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
