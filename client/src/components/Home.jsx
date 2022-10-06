import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Home.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Filters from "./Filters";
import {
  getVideogames,
  getGenres,
  orderAlph,
  orderRating,
  getPlatforms
} from "../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms())
  }, [dispatch]);

  function handlerReload(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexOfLastPk = currentPage * gamesPerPage;
  const indexOfFirstPk = indexOfLastPk - gamesPerPage;
  const currentgames = allVideogames.slice(indexOfFirstPk, indexOfLastPk);

  const paginado = (pagNum) => {
    setCurrentPage(pagNum);
  };

  //filtros y ordenamientos
  const [order, setOrder] = useState("");
  const [rating, setRating] = useState("");

  function handlerOrderAlph(e) {
    e.preventDefault();
    dispatch(orderAlph(e.target.value));
    setCurrentPage(1);
    setOrder(`ORDER ${e.target.value} `);
  }
  function handlerOrderRating(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value));
    setCurrentPage(1);
    setRating(`RATING ${e.target.value} `);
  }

  return (
    <body>
      <div>
        <div className="title">
          <h1>VIDEOGAMES PI</h1>
        </div>
        <nav className="nav">
          <div>
            <Link to="/videogames">
              <button className="addVideogame">Create Videogame</button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <button className="reloadButton">Go Landing page</button>
            </Link>
          </div>

          <div>
            <button onClick={(e) => handlerReload(e)} className="reloadButton">
              Reload Videogames
            </button>
          </div>
        </nav>

        <br />
        <div>
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>
        <br />
        <br />
        <nav className="toAlign">
          <Filters />
          <select
            className="orderSelector"
            onChange={(e) => handlerOrderAlph(e)}
          >
            <option value="" hidden>
              Order
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select
            className="orderSelector"
            onChange={(e) => handlerOrderRating(e)}
          >
            <option value="" hidden>
              Rating
            </option>
            <option value="best">Best Rating</option>
            <option value="worst">Worst Rating</option>
          </select>
        </nav>
        <div>
          <Paginado
            gamesPerPage={gamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
          />
        </div>
        <br />
      </div>
      <br />
      <br />
      <div className="cards">
        {currentgames &&
          currentgames.map((v) => {
            return (
              <div className="cards">
                <Card
                  id={v.id}
                  name={v.name}
                  key={v.id}
                  background_image={v.background_image}
                  rating={v.rating}
                  platforms={
                    !v.createdInDb
                      ? v.platforms.toString()
                      : v.platforms.map((vg) => vg.name + ",")
                  }
                />
              </div>
            );
          })}
      </div>
    </body>
  );
}
