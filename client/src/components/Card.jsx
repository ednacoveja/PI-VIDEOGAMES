import React from "react";
import { Link } from "react-router-dom";
import "../css/Card.css";

export default function Card({ id, name, background_image, platforms, rating }) {
  return (
    <div className="card">
      <h1 className="title">
        <Link to={"/videogame/" + id}>{name}</Link>
      </h1>
      <h3>rating: {rating}</h3>
      <h3>platforms: {platforms}</h3>
      <img
        className="image"
        src={background_image}
        alt="https://th.bing.com/th/id/R.9d27c7f3b4b65d63797f3422e4536313?rik=0Dq86MJWuO98lw&pid=ImgRaw&r=0"
        width="200px"
        height="230px"
      />
    </div>
  );
}
