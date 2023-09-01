import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Comics = ({ search, skip, setSkip }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://site--marvel-backend--4xcmgcydfhpz.code.run/comics/?skip=${skip}`
      );
      console.log(response.data);
      setData(response.data);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (!data || isLoading) return null;

  // const filteredComics = [];
  const filteredComics = data.results.filter((comic) => {
    return comic.title.includes(search);
  });

  return (
    <>
      {/* <button
        onClick={() => {
          setSkip(skip + 100);
          console.log(skip);
          navigate("/Comics");
        }}
      >
        page suivante
      </button>
      <button
        onClick={() => {
          setSkip(skip - 100);
          console.log(skip);
          navigate("/Comics");
        }}
      >
        page précédente
      </button> */}

      <div className="container">
        {filteredComics.map((comic) => {
          return (
            <div className="marvel-card" key={comic._id}>
              <br />
              <h1>{comic.title}</h1>
              <br />
              <div className="marvel-img">
                <img
                  className="marvel-pic"
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt=""
                />
              </div>
              <br />
              <p>{comic.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
