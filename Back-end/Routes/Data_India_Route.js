const express = require('express');
const router = express.Router();
const India_Model = require('../Model/Data_India')
const India_Controller = require('../Controller/India_controller')

router.get('/retrive_Data',India_Controller.retriveData)
router.post('/post_Data',India_Controller.postData)

module.exports = router;