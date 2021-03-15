const express = require('express');
const router = express.Router();
const World_controller = require('../Controller/World_controller')

// retriving the whole data
router.get('/retrive_Data',World_controller.retriveData)
// you can retrive the data of the specific state by providing the state name
router.get('/retrive_Data/:countryname',World_controller.retriveSpecificData)
// posting the data to the database
router.post('/post_Data',World_controller.postData)
// foe deleting the data 
router.delete('/delete_Data',World_controller.deleteData)

module.exports = router;