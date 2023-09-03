import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Comics = ({ search, skip, setSkip }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [count, setCount] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://site--marvel-backend--4xcmgcydfhpz.code.run/comics/?skip=${skip}`
      );
      console.log(response.data);
      setData(response.data);
      setCount(count);
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
      <article height={250} width={250} className="container-marvel">
        {filteredComics.map((comic) => {
          return (
            <>
              <div className="marvel-card" key={comic._id}>
                <div>
                  {data.results.map((comics, index) => {
                    return (
                      <>
                        <div key={index} className="comics">
                          <Link to={`/comics/${comics._id}`}>
                            <h2 className="titlecomic">{comics.title}</h2>
                            <img
                              src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                              alt="marvel-img"
                            />

                            <div className="description">
                              {comics.description}
                            </div>
                          </Link>
                        </div>
                      </>
                    );
                  })}{" "}
                </div>
              </div>
            </>
          );
        })}
      </article>
    </>
  );
};

export default Comics;
