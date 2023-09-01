// import { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../assets/marvel-gif.gif";

const Home = () => {
  return (
    <div className="hero">
      <Link to={"/comics"} key={name._id}>
        <button>Comics</button>
      </Link>
      <Link to={`/characters/`} key={name._id}>
        <button>Personnages</button>
      </Link>
      <div>
        <Link to={"/Login"}>
          <button>Login</button>
        </Link>
        <Link to={"/Signup"}>
          <button>Signup</button>
        </Link>
      </div>
      <div className="hero">
        <img src={Image} alt="" />
      </div>
    </div>
    // <div className="her">
    //   <div className="prof">
    //     <div className="box-one">{/* <img src={Image} alt="" /> */}</div>
    //     <div className="box-two"> 2</div>

    //     <div className="box-one" data-text="Xavier"></div>

    //     <div className="box-tree" data-text="Gwen"></div>
    //     <div className="box-four" data-text="Tom"></div>
    //     <div className="box-five" data-text="Lucas"></div>
    //   </div>
    // </div>
  );
};
export default Home;
