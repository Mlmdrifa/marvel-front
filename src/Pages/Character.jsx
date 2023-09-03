import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--4xcmgcydfhpz.code.run/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p> Loading ...</p>
  ) : (
    <>
      <div className="charac">
        <h1>{data.name}</h1>
        <img
          className="chara-img"
          src={data.thumbnail.path + "." + data.thumbnail.extension}
          alt=""
        />
        <h1>{data.name}</h1>
        <p>{data.description}</p>

        {data.comics.map((comics, index) => {
          return (
            <div key={index}>
              <Link to={`/comic/${comics._id}`}>
                <h1>{comics.name}</h1>
                <img
                  to={`/comic/${comics._id}`}
                  src={`${comics.thumbnail.path}/standard_fantastic.${comics.thumbnail.extension}`}
                  alt="comic-img"
                />
                <div>{comics.title}</div>
                <div>{comics.description}</div>
              </Link>
            </div>
          );
        })}

        <br />
      </div>
    </>
  );
};

export default Character;
