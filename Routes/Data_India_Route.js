const express = require("express");
const router = express.Router();
const India_Controller = require("../Controller/India_controller");

// retriving the whole data
router.get("/retrive_data", India_Controller.retriveData);
// you can retrive the data of the specific state by providing the state name
router.get("/retrive_Data/:statename", India_Controller.retriveSpecificData);
// posting the data to the database
router.post("/post_data", India_Controller.postData);
// foe deleting the data
router.delete("/delete_data", India_Controller.deleteData);
module.exports = router;