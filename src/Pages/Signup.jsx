import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
    event.preventDefault();
    try {
      const response = await axios.post(
        // "https://site--marvel-backend--4xcmgcydfhpz.code.run/signup/",
        "https://site--marvel-backend--4xcmgcydfhpz.code.run/signup/",
        {
          username: username,
          password: password,
          email: email,
          newsletter: newsletter,
        }
      );

      alert("Votre inscription a été effectuée !");
      console.log(response.data);
      // console.log(data);

      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs :)");
      }
    }
  };

  return (
    <main className="container">
      <div className="signup">
        <h1>S'inscrire</h1>
        <br />
        <form id="contactform" onSubmit={handleSubmit}>
          <input
            className="signup-form"
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="Nom d'utilisateur"
            value={username}
            placeholder="Nom d'utilisateur"
          />
          <br />
          <input
            className="signup-form"
            onChange={handleEmailChange}
            type="email"
            name="email"
            value={email}
            placeholder="Email"
          />
          <br />
          <input
            className="signup-form"
            onChange={handlePasswordChange}
            type="password"
            name="password"
            value={password}
            placeholder="Votre mot de passe"
          />
          <br />
          <div className="checkbox-container">
            <div>
              <div className="inpu">
                <input
                  className="signup-form"
                  onChange={handleNewslettersChange}
                  type="checkbox"
                  value={newsletter}
                  name="newsletter"
                />
                <>S'inscrire à notre newsletters</>
              </div>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions <br />
                et Politique de Confidentialité de Marvel. Je confirme avoir au
                moins 15 ans.
              </p>
            </div>
            <br />
            <input className="inscription" type="submit" value="S'inscrire" />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </form>
        <Link to="/login">Tu as déjà un compte ? connectes-toi !</Link>
      </div>
    </main>
  );
};

export default Signup;
