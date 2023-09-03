import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Characters = ({ search }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const [limit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await axios.get(
        `https://site--marvel-backend--4xcmgcydfhpz.code.run/characters/?name=${search}&skip=${skip}&limit=${limit}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
    console.log(skip);
  }, [skip]);

  if (!data || isLoading) return null;

  const filteredCharacters = data.results.filter((character) => {
    return character.name.includes(search);
  });

  return (
    <>
      {/* pagination */}

      <div className="pagination">
        <button
          onClick={() => {
            setSkip(skip - data.limit);
            console.log(skip);
            navigate("/Characters");
          }}
        >
          Page précédente
        </button>
      </div>

      <button
        onClick={() => {
          setSkip(skip + data.limit);
        }}
      >
        Page suivante
      </button>

      <div className="block">
        <div className="card">
          {filteredCharacters.map((character) => {
            return (
              <>
                <article key={name._id}>
                  <h2 className="charaname"> {character.name}</h2>

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
      </div>
    </>
  );
};
export default Characters;
