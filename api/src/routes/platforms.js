const { Router } = require('express');
const {getPlatforms}=require("./functions")

const router=Router()

router.get("/",getPlatforms)


module.exports=router