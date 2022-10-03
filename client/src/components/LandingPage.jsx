import React from "react";
import "../css/LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="all">
      <h1 className="title">BIENVENIDOS</h1>
      <h2 className="title">A LA APLICACION DE VIDEOGAMES</h2>
      <div>
        <Link to="/home">
          <button className="homeButton">GO</button>
        </Link>
      </div>
    </div>
  );
}
