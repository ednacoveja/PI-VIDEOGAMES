//"rafce" pone la estructura de un componente de react

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../css/VideogameCreate.css";
import { getGenres, getPlatforms, postVideogame } from "../redux/actions";

function VideogameCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlatforms(), getGenres());
  }, [dispatch]);

  const platforms = useSelector((state) => state.allPlatforms);
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    genres: [],
    platforms: [],
  });

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handlerSelectGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };
  const handlerSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };
  const handlerDeleteGenres = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  };
  const handlerDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== e),
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("Videogame Created!");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      image: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  };

  return (
    <div>
      <div className="form">
        <br />
        <Link to="/home">
          <button className="buttonHome">Return HOME</button>
        </Link>
        <h1 className="title">Create your new video game</h1>

        <form>
          <div>
            <label className="label">Name:</label>
            <input
              className="input"
              type="text"
              name="name"
              value={input.name}
              onChange={handlerChange}
            />
            <br />
            <br />
            <label className="label">Description:</label>
            <input
              className="input"
              type="text"
              name="description"
              value={input.description}
              onChange={handlerChange}
            />
            <br />
            <br />
            <label className="label">Released:</label>
            <input
              type="date"
              name="released"
              className="input"
              value={input.released}
              onChange={handlerChange}
            />
            <br />
            <br />
            <label className="label">Rating:</label>
            <input
              type="number"
              name="rating"
              className="input"
              value={input.rating}
              onChange={handlerChange}
            />
            <br />
            <br />
            <label className="label">Image:</label>
            <input
              type="text"
              name="image"
              className="input"
              value={input.image}
              onChange={handlerChange}
            />
            <br />
            <br />
            <label className="label">Genres:</label>
            <select
              className="input"
              name="genres"
              onChange={handlerSelectGenres}
            >
              <option value="" hidden>
                Select Genres
              </option>
              {genres &&
                genres.map((g) => (
                  <option className="option" value={g.name}>
                    {g.name}
                  </option>
                ))}
            </select>
            <ul>
              <li>
                {input.genres.map((g) => (
                  <div>
                    {g}
                    <button
                      onClick={() => handlerDeleteGenres(g)}
                      type="button"
                    >
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
            <br />
            <br />
            <label className="label">Platforms:</label>
            <select
              className="input"
              name="platforms"
              onChange={handlerSelectPlatforms}
            >
              <option value="" hidden>
                Select Platforms
              </option>
              {platforms &&
                platforms.map((p) => (
                  <option className="option" value={p.name}>
                    {p.name}
                  </option>
                ))}
            </select>
            <ul>
              <li>
                {input.platforms.map((p) => (
                  <div>
                    {p}
                    <button
                      onClick={() => handlerDeletePlatforms(p)}
                      type="button"
                    >
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
            <br />
            <br />
            <br />
            <button
              className="buttonCreate"
              type="submit"
              onClick={(e) => handlerSubmit(e)}
            >
              CREATE
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideogameCreate;
