let intitalState = {
  videogames: [], //es el que renderizamos
  allVideogames: [], //no cambiar
  genres: [],
  detail: [],
  allPlatforms: [],
};

export default function rootReducer(state = intitalState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "FILTER_CREATE":
      const traerGames = state.videogames;
      const buscar =
        action.payload === "db"
          ? traerGames.filter((v) => v.createdInDb)
          : traerGames.filter((v) => !v.createdInDb);
      return {
        ...state,
        videogames: action.payload === "all" ? state.allVideogames : buscar,
      };
    case "FILTER_GENRES":
      const games = state.videogames;
      const filterApi = games.filter((v) => !v.createdInDb);
      const genresApi = filterApi.filter((v) =>
        v.genres.includes(action.payload)
      );
      const filterDb = games.filter((v) => v.createdInDb);
      const genresDb = filterDb.filter((v) => {
        for (let i = 0; i < v.genres.length; i++) {
          if (v.genres[i].name === action.payload) {
            return v;
          }
        }
      });
      //        v.genres.map((g) => g.name.includes(action.payload))
      const result = genresApi.concat(genresDb);

      return {
        ...state,
        videogames: [...result],
      };

    case "FILTER_PLATFORMS":
      const vGames = state.videogames;
      const filtApi = vGames.filter((v) => !v.createdInDb);
      const platformsApi = filtApi.filter((v) =>
        v.platforms.includes(action.payload)
      );
      const filtDb = vGames.filter((v) => v.createdInDb);
      const platformsDb = filtDb.filter((v) => {
        for (let i = 0; i < v.platforms.length; i++) {
          if (v.platforms[i].name === action.payload) {
            return v;
          }
        }
      });
      //        v.genres.map((g) => g.name.includes(action.payload))
      const resultado = platformsApi.concat(platformsDb);

      return {
        ...state,
        videogames: [...resultado],
      };

    case "ORDER_ALPH":
      let allVg = state.videogames;
      let orderName =
        action.payload === "A-Z"
          ? allVg.sort(function (a, b) {
              if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) {
                return 1;
              }
              if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) {
                return -1;
              }
              return 0;
            })
          : allVg.sort(function (a, b) {
              if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) {
                return -1;
              }
              if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: orderName,
      };
    case "ORDER_RATING":
      let allGames = state.videogames;
      let orderRating =
        action.payload === "worst"
          ? allGames.sort(function (a, b) {
              if (parseFloat(a.rating) > parseFloat(b.rating)) {
                return 1;
              }
              if (parseFloat(a.rating) < parseFloat(b.rating)) {
                return -1;
              }
              return 0;
            })
          : allGames.sort(function (a, b) {
              if (parseFloat(a.rating) > parseFloat(b.rating)) {
                return -1;
              }
              if (parseFloat(a.rating) < parseFloat(b.rating)) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: orderRating,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: {},
      };
    case "GET_PLATFORMS":
      return {
        ...state,
        allPlatforms: action.payload,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    default:
      return state;
  }
}
