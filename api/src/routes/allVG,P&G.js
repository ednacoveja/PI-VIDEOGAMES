const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db.js");
const { API_KEY } = process.env;

async function genresInDB() {
  let genresDB = await Genre.findAll();
  if (genresDB.length === 0) {
    let llamadoApi = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    let data = llamadoApi.data.results.map((g) => {
      return { name: g.name };
    });
    genresDB = await Genre.bulkCreate(data);
  }
  return genresDB;
}

async function platformsInDB() {
    const infoGET = await axios.get(`http://localhost:3001/videogames`);
    const array_platforms = infoGET.data.map((v) => v.platforms);
    const platforms = array_platforms.toString().split(",");
   platforms.forEach((p) => {
      Platform.findOrCreate({
        //findOrCreate busca si esta entidad ya esta creada en el modelo y no hace nada, de lo contrario la crea
        where: { name: p }, 
      });
    });
    const allPlatforms = await Platform.findAll();
    return allPlatforms
}

async function videogamesAPI() {
  let videogames = [];
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    for (let i = 0; i < 5; i++) {
      let pages = await axios.get(url);
      pages.data.results.map((e) => {
        videogames.push({
          id: e.id,
          name: e.name,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          background_image: e.background_image,
          genres: e.genres.map((e) => e.name),
        });
      });
      url = pages.data.next;
    }
    return videogames;
  } catch (error) {
    console.error(error);
  }
}

async function videogamesInDB() {
  const videogamesDB = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
    include: {
      model: Platform,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return videogamesDB;
}

async function allVideogames() {
  const infoAPI = await videogamesAPI();
  const infoDB = await videogamesInDB();
  const infoTOTAL = infoAPI.concat(infoDB);
  return infoTOTAL;
}

async function idVideogameAPI(idVideogame) {
  const videogame = await axios(
    `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
  );
  const {
    id,
    name,
    background_image,
    genres,
    platforms,
    description,
    rating,
    released,
  } = videogame.data;

  const result = {
    id,
    name,
    background_image,
    genres: genres.map((g) => g.name),
    platforms: platforms.map((p) => p.platform.name),
    description,
    rating,
    released,
  };
  return result;
}

module.exports = { genresInDB, allVideogames, idVideogameAPI, platformsInDB };
