const { Router } = require('express');
const { getPlatformsDB}=require("./functions")

const router=Router()

router.get("/", getPlatformsDB)


module.exports=router