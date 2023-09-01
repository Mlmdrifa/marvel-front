import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Characters = ({ search, skip, setSkip, limit }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await axios.get(
        `https://site--marvel-backend--4xcmgcydfhpz.code.run/characters/?name=${search}&skip=${skip}&limit=${limit}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [skip]);

  if (!data || isLoading) return null;

  const filteredCharacters = data.results.filter((character) => {
    return character.name.includes(search);
  });

  return (
    <>
      <div className="skip">
        <button
          onClick={(_id) => {
            setSkip(skip - 100);
            console.log(skip);
            navigate("/Characters");
          }}
        >
          Page précédente
        </button>
        <button
          onClick={() => {
            setSkip(skip + 100);
            console.log(skip);
            navigate("/Characters");
          }}
        >
          Page suivante
        </button>
      </div>
      <div className="container">
        {filteredCharacters.map((character) => {
          return (
            <>
              <article className="charcters-card" key={name._id}>
                <h1>{character.name}</h1>
                <br />

                <Link to={`/comics/${character._id}`} key={name._id}>
                  <img
                    className="charcters-pic"
                    height={250}
                    width={250}
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt=""
                  />
                </Link>

                <p>{character.description}</p>
              </article>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Characters;
