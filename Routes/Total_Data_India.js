const express = require('express');
const router = express.Router();
const Total_IndiaCases_Controller = require('../Controller/Total_IndiaCases');

// retriving the whole data
router.get('/get_data',Total_IndiaCases_Controller.retriveData);
// posting the data to the database
router.post('/post_data',Total_IndiaCases_Controller.postData);
// deleting the data
router.delete('/delete_data', Total_IndiaCases_Controller.deleteData)

module.exports = router;