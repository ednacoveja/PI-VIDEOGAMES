const { Router } = require('express');
const {getGenresDB}=require("./functions")

const router=Router()

router.get("/",getGenresDB)


module.exports=router