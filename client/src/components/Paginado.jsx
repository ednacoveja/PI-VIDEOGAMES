import React from "react";
import "../css/Paginado.css"


export default function Paginado({ gamesPerPage, allVideogames, paginado }) {

  const PageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    PageNumbers.push(i);
  }

  return (
    <nav className="pag-nav">
      <ul className="ul">
        {PageNumbers?.map((number) => (
              <button className="button"
              key={number} onClick={() => paginado(number)}>
              {number}
            </button>
        ))}
      </ul>
    </nav>
  );
}