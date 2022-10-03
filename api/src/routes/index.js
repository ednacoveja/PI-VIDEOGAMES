const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videogames = require("./videogames");
const genres = require("./genres");
const platforms = require("./platforms");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/platforms", platforms);

module.exports = router;
