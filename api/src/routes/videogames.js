const { Router } = require("express");
const { getVideogames,getVideogamesID,postVideogame,deleteId,putVideogame } = require("./functions");

const router = Router();

router.get("/", getVideogames);//tambien busca por name

router.get("/:idVideogame", getVideogamesID);

router.post("/", postVideogame)

router.delete("/:idVideogameDelete",deleteId)

router.put("/:name",putVideogame)

module.exports = router;
