import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    // <>
    <div className="charac">
      <h1>{data.name}</h1>
      <img
        className="chara-img"
        src={data.thumbnail.path + "." + data.thumbnail.extension}
        alt=""
      />
      <p>{data.description}</p>

      <br />
    </div>
  );
};

export default Character;
