//"rafce" pone la estructura de un componente de react

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../css/VideogameCreate.css";
import { getGenres, getPlatforms, postVideogame } from "../redux/actions";

function validate(form) {
  let errors = {};
  if (!form.name) {
    errors.name = "Name required.";
  } else if (form.name.length > 17 || form.name.length < 3) {
    errors.name = "Must be between 3 and 17 characters long";
  }
  if (!form.released) {
    errors.released = "Date released required.";
  }

  if (!form.rating) {
    errors.rating = "Rating required.";
  } else if (form.rating > 5 || form.rating < 1) {
    errors.rating = "It has to be a number between 1 and 5";
  }
  if (!form.genres.length) {
    errors.genres = "A genre is required.";
  }
  if (!form.platforms.length) {
    errors.platforms = "A platform is required.";
  }
  if (!form.description) {
    errors.description = "Description required.";
  } else if (form.description.length > 150 || form.description.length < 3) {
    errors.description = "Must be between 3 and 150 characters long";
  }
  return errors;
}

function VideogameCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlatforms(), getGenres());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(input));
  }, []);

  const platforms = useSelector((state) => state.allPlatforms);
  const allgenres = useSelector((state) => state.genres);

  const [errors, setErrors] = useState({});

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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  };
  const handlerSelectGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    );
  };
  const handlerSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    );
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
    if (Object.keys(errors).length === 0) {
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
    } else {
      alert("YOU MUST MEET THE MINIMUM REQUIREMENTS");
    }
  };

  return (
    <div>
      <div className="form">
        <br />

        <Link to="/home">
          <button className="buttonHome">Return HOME</button>
        </Link>
        <br />
        <h1 className="titulo">Create your new videogame</h1>
        <br />
        <form>
          <div>
            <label className="label">Name:</label>
            <input
              className="input"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handlerChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <br />
            <br />
            <label className="label">Description:</label>
            <input
              className="input"
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handlerChange(e)}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <br />
            <br />
            <label className="label">Released:</label>
            <input
              type="date"
              name="released"
              className="input"
              value={input.released}
              onChange={(e) => handlerChange(e)}
            />
            {errors.released && <p className="error">{errors.released}</p>}
            <br />
            <br />
            <label className="label">Rating:</label>
            <input
              type="number"
              name="rating"
              className="input"
              value={input.rating}
              onChange={(e) => handlerChange(e)}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
            <br />
            <br />
            <label className="label">Image:</label>
            <input
              type="text"
              name="image"
              className="input"
              value={input.image}
              onChange={(e) => handlerChange(e)}
            />
            {!input.image && (
              <p className="warning">
                "WARNING: if you don't put a URL, will be used an alternative."
              </p>
            )}
            <br />
            <br />
            <label className="label">Genres:</label>
            <select
              disabled={input.genres.length > 3}
              className="input"
              name="genres"
              onChange={(e) => handlerSelectGenres(e)}
            >
              <option value="" hidden>
                Select Genres
              </option>
              {allgenres &&
                allgenres.map((g) => (
                  <option className="option" value={g.name}>
                    {g.name}
                  </option>
                ))}
            </select>
            {errors.genres && <p className="error">{errors.genres}</p>}
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
              disabled={input.platforms.length > 3}
              className="input"
              name="platforms"
              onChange={(e) => handlerSelectPlatforms(e)}
            >
              <option value="" hidden>
                Select Platforms
              </option>
              {platforms &&
                platforms.map((p) => (
                  <option className="option" value={p}>
                    {p}
                  </option>
                ))}
            </select>
            {errors.platforms && <p className="error">{errors.platforms}</p>}
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
            <button
              //disabled={Object.keys(errors).length !== 0}
              className="buttonCreate"
              type="submit"
              onClick={(e) => handlerSubmit(e)}
            >
              {console.log(errors)}
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
