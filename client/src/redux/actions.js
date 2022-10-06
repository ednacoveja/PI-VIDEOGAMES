import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getNameVideogame(name) {
  return async function (dispatch) {
    try {
      let json = await axios("http://localhost:3001/videogames?name=" + name);
      return dispatch({
        type: "GET_NAME",
        payload: json.data,
      });
    } catch (error) {
      //alert("Juego No Encontrado");
      console.log(error);
      alert(error.response.data);//viene del back
    }
  };
}

//promesa
/*export function getNameVideogame(name) {
  return function (dispatch) {
     axios("http://localhost:3001/videogames?name=" + name)
      .then((json) => {
        dispatch({
          type: "GET_NAME",
          payload: json.data,
        });
      })
      .catch((error) => {
        alert(error.response.data)
      });
  };
}*/


export function filterByCreate(value) {
  return {
    type: "FILTER_CREATE",
    payload: value,
  };
}

export function filterByGenres(value) {
  return {
    type: "FILTER_GENRES",
    payload: value,
  };
}
export function filterByPlatforms(value) {
  return {
    type: "FILTER_PLATFORMS",
    payload: value,
  };
}

export function orderAlph(value) {
  return {
    type: "ORDER_ALPH",
    payload: value,
  };
}
export function orderRating(value) {
  return {
    type: "ORDER_RATING",
    payload: value,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios("http://localhost:3001/videogames/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post("http://localhost:3001/videogames", payload);
      return json;
    } catch (error) {
      alert(error);
    }
  };
}
