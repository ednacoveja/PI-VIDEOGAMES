const { Videogame, Genre, Platform } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const {
  genresInDB,
  allVideogames,
  idVideogameAPI,
  platformsInDB,
} = require("./allVG,P&G");

const getGenresDB = async (req, res) => {
  try {
    const getGenres = await genresInDB();
    res.status(200).send(getGenres);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getPlatformsDB = async (req, res) => {
  try {
    const platforms = await platformsInDB();
    res.status(200).send(platforms);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getVideogames = async (req, res) => {
  try {
    const { name } = req.query;
    const allVG = await allVideogames();
    if (!name) {
      res.status(200).send(allVG);
    } else {
      const buscar = allVG.filter((v) =>
        v.name.toLowerCase().includes(name.toLowerCase())
      );
      if (buscar.length) {
        res.status(200).send(buscar);
      } else {
        res.status(404).send("videogame not found");
      }
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const getVideogamesID = async (req, res) => {
  try {
    const { idVideogame } = req.params;

    if (idVideogame.length > 10) {
      const result = await Videogame.findOne({
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
        where: {
          id: idVideogame,
        },
      });

      return res.status(200).send(result);
    } else {
      const videogameAPI = await idVideogameAPI(idVideogame);
      res.status(200).send(videogameAPI);
    }
  } catch (error) {
    res.status(404).send("not found");
    console.log(error)
  }
};

const postVideogame = async (req, res) => {
  try {
    let {
      name,
      description,
      released,
      background_image,
      platforms,
      genres,
      rating,
    } = req.body;
    let createVG = await Videogame.create({
      name,
      description,
      released,
      rating: parseFloat(rating),
      background_image:
        background_image ||
        "https://www.narbis.com/wp-content/uploads/2021/01/GAME.jpg",
    });
    let buscarGenres = await Genre.findAll({
      where: { name: genres },
    });
    let buscarPlatforms = await Platform.findAll({
      where: { name: platforms },
    });
    createVG.addGenre(buscarGenres);
    createVG.addPlatform(buscarPlatforms);
    res.status(200).send(createVG);
  } catch (err) {
    res.status(400).send(err);
    console.log(err)
  }
};

const deleteId = async (req, res) => {
  try {
    const { idVideogameDelete } = req.params;
    const buscar = await Videogame.findByPk(idVideogameDelete);
    if (buscar) {
      await Videogame.destroy({
        where: {
          id: idVideogameDelete,
        },
      });
      res.status(200).send("eliminado exitosamente");
    } else {
      res.status(404).send("no existe ese id o ya fue eliminado");
    }
  } catch (error) {
    res.status(404).send(error + " no se puede borrar ese videogame");
  }
};

module.exports = {
  getGenresDB,
  getVideogames,
  getVideogamesID,
  postVideogame,
  deleteId,
  getPlatformsDB,
};
