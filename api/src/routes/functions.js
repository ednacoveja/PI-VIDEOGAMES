const { Videogame, Genre } = require("../db");
const {
  genresInDB,
  allVideogames,
  idVideogameAPI,
  platformsBuscar,
} = require("./allVG,P&G");

const getGenresDB = async (req, res) => {
  try {
    const genres = await genresInDB();
    res.status(200).send(genres);
  } catch (error) {
    res.status(404).send(error);
  }
};
const getPlatforms = async (req, res) => {
  try {
    const allPlatforms = await platformsBuscar();
    const platforms = [];
    allPlatforms &&
      allPlatforms.forEach((a) => {
        a.map((p) => {
          if (!platforms.includes(p)) platforms.push(p);
        });
      });

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
    console.log(error);
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
      platforms,
      background_image:
        background_image ||
        "https://www.narbis.com/wp-content/uploads/2021/01/GAME.jpg",
    });
    let buscarGenres = await Genre.findAll({
      where: { name: genres },
    });

    createVG.addGenre(buscarGenres);

    res.status(200).send("Videogame Created!");

    console.log(createVG);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
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
      res.status(200).send("Successfully Deleted");
    } else {
      res.status(404).send("no existe ese id o ya fue eliminado");
    }
  } catch (error) {
    res.status(404).send(error + " no se puede borrar ese videogame");
  }
};

const putVideogame = async (req, res) => {
  try {
    const {nameParams}=req.params
    const updateVG = await Videogame.findOne({ where: { name: nameParams } });
    let {
      name,
      description,
      released,
      background_image,
      platforms,
      genres,
      rating,
    } = req.body;
     updateVG = await Videogame.update({
      name,
      description,
      released,
      rating: parseFloat(rating),
      platforms,
      background_image,
    });
    let genresIndb = await Genre.findAll({
      where: { name: genres },
    });

    updateVG.addGenre(genresIndb);

    res.status(200).send("Successfully updated videogame");

  } catch (error) {
    res.status(404).send(error + " no se pudo modificar el videogame");
  }
};

module.exports = {
  getGenresDB,
  getVideogames,
  getVideogamesID,
  postVideogame,
  deleteId,
  getPlatforms,
  putVideogame,
};
