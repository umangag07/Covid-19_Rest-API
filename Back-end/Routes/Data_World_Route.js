const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({message:"You are on the endPoint of world data"})
})

module.exports = router;