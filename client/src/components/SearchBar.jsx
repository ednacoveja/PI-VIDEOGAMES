import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../redux/actions";
import "../css/SearchBar.css";

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handlerInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Please enter a name");
    } else {
      dispatch(getNameVideogame(name));
      setName("");
    }
    setCurrentPage(1)
  }

  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Buscar Videogame...."
        onChange={(e) => handlerInput(e)}
        value={name}
      />
      <button
        className="searchButton"
        type="submit"
        onClick={(e) => handlerSubmit(e)}
      >
        BUSCAR
      </button>
    </div>
  );
}
