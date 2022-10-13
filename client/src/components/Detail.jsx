import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getDetail, clearDetail, deleteVideogame } from "../redux/actions";
import "../css/Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getDetail(id));
  }, [dispatch, id]);
  const videogameDetail = useSelector((state) => state.detail);

  const history = useHistory();

  function ConfirmAlert() {
    //Ingresamos un mensaje a mostrar
    var mensaje = window.confirm(
      "Are you sure you want to delete this videogame?"
    );
    //Detectamos si el usuario acepto el mensaje
    if (mensaje) {
    
      dispatch(deleteVideogame(id));
      
      history.push("/home");
    }
  }

  function handlerDelete(e) {
    e.preventDefault(e);
    ConfirmAlert();
  }

  return (
    <div>
      <div className="alldetail">
        <br />
        {id.includes("-") && (
          <button onClick={(e) => handlerDelete(e)}>DELETE VIDEOGAME</button>
        )}

        <h1 className="title">{videogameDetail.name}</h1>
        <div className="divD">
          <h3 className="alignPlatforms">Platforms:</h3>
          <h4>
            {videogameDetail.platforms &&
              videogameDetail.platforms.map((p) => <ul key={p}>{p}</ul>)}
          </h4>
        </div>
        <div className="divD">
          <h3 className="alignRating">Rating: </h3>
          <h4> {videogameDetail.rating}</h4>
        </div>
        <div className="divD">
          <h3 className="alignReleased">Released: </h3>
          <h4> {videogameDetail.released}</h4>
        </div>
        <div className="divD">
          <h3 className="alignGenre">Genres: </h3>
          <h4>
            {id.includes("-")
              ? videogameDetail.genres &&
                videogameDetail.genres.map((g) => (
                  <ul key={g.name}>{g.name}</ul>
                ))
              : videogameDetail.genres &&
                videogameDetail.genres.map((g) => <ul key={g}>{g}</ul>)}{" "}
          </h4>
        </div>
      </div>
      <img
        className="img"
        src={videogameDetail.background_image}
        alt="https://th.bing.com/th/id/R.9d27c7f3b4b65d63797f3422e4536313?rik=0Dq86MJWuO98lw&pid=ImgRaw&r=0"
        width="200px"
        height="230px"
      />
      <br />
      <div className="alldetail">
        <h3 className="description">
          Description: {videogameDetail.description}
        </h3>
      </div>
      <br />
      <button>
        <Link to="/home" className="homeButtonD">
          BACK HOME
        </Link>
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}
