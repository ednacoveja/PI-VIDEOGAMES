const { Router } = require("express");
const { getVideogames,getVideogamesID,postVideogame,deleteId } = require("./functions");

const router = Router();

router.get("/", getVideogames);//tambien busca por name

router.get("/:idVideogame", getVideogamesID);

router.post("/", postVideogame)

router.delete("/:idVideogameDelete",deleteId)

module.exports = router;
