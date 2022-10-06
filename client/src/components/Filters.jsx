import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCreate,
  filterByGenres,
  filterByPlatforms,
} from "../redux/actions";
import "../css/Filters.css";

export default function Filters() {
  const dispatch = useDispatch();

  const allgenres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.allPlatforms);

  function handlerFilterCreate(e) {
    e.preventDefault();
    dispatch(filterByCreate(e.target.value));
  }

  function handlerFilterGenres(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
  }

  function handlerFilterPlatforms(e) {
    e.preventDefault();
    dispatch(filterByPlatforms(e.target.value));
  }
  return (
    <div className="filters">
      <select className="showSelector" onChange={(e) => handlerFilterCreate(e)}>
        <option value="all">ALL</option>
        <option value="api">EXISTENTES</option>
        <option value="db">CREADOS</option>
      </select>

      <select className="showSelector" onChange={(e) => handlerFilterGenres(e)}>
        <option value="" hidden>
          Filter by Genres
        </option>
        {console.log(allgenres)}
        {allgenres &&
          allgenres.map((g) => (
            <option value={g.name} key={g.name}>
              {g.name}
            </option>
          ))}
      </select>

      <select
        className="showSelector"
        onChange={(e) => handlerFilterPlatforms(e)}
      >
        <option value="" hidden>
          Filter by Platforms
        </option>
        {platforms &&
          platforms.map((p) => (
            <option value={p.name} key={p.id}>
              {p.name}
            </option>
          ))}
      </select>
    </div>
  );
}
