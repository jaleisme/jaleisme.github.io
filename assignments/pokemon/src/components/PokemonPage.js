import React from "react";
import { useLocation } from "react-router-dom";

const PokemonPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="main-wrapper">
      <div className="main">
        <div className="hello-container">
          <h1>{location.state.name}</h1>
          <img src={location.state.img} alt={location.state.name} />
          <p>{location.state.intro}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
