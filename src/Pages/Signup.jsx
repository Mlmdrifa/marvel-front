import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ handleToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNewslettersChange = () => {
    setNewsletter(!newsletter);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const data = {
        username,
        email,
        password,
      };
      const response = await axios.post(
        "https://site--marvel-backend--4xcmgcydfhpz.code.run/signup/",
        {
          username,
          password,
          email,
          newsletter,
        }
      );

      alert("Votre inscription a été effectuée !");
      console.log(response.data);
      // console.log(data);

      handleToken(response.data.token);
      navigate("/comics");
    } catch (error) {
      console.log(error.message);
      if (error.response.token === "error") {
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre"
        );
      } else if (alert("Missing parameters")) {
        setErrorMessage("Veuillez remplir tous les champs :)");
      }
    }
    setIsLoading(false);
  };

  return (
    <main className="container">
      <div className="signup">
        <h1 className="signup-sinscrire">S'inscrire</h1>
        <br />
        <div className="formulaire">
          <form id="contactform" onSubmit={handleSubmit}>
            <input
              className="signup-form"
              onChange={handleUsernameChange}
              type="text"
              value={username}
              placeholder="Nom d'utilisateur"
            />
            <br />
            <input
              className="signup-form"
              onChange={handleEmailChange}
              type="email"
              value={email}
              placeholder="Email"
            />
            <br />
            <input
              className="signup-form"
              onChange={handlePasswordChange}
              type="password"
              value={password}
              placeholder="Votre mot de passe"
            />
            <br />
            <div className="checkbox">
              <div>
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={handleNewslettersChange}
                />
                <span className="newlestter">
                  S'inscrire à notre newsletters
                </span>
              </div>
              <br />
              <input className="inscription" type="submit" value="S'inscrire" />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          </form>
        </div>

        <Link className="signup-connect" to="/login">
          Tu as déjà un compte ? connectes-toi !
        </Link>
      </div>
    </main>
  );
};

export default Signup;
