const express = require("express");
const router = express.Router();
const World_controller = require("../Controller/World_controller");

// retriving the whole data
router.get("/get_data", World_controller.retriveData);
// retriving the whole data required in table
router.get("/get_data_table", World_controller.retriveRequiredData);
// you can retrive the data of the specific state by providing the state name
router.get("/get_data/:countryname", World_controller.retriveSpecificData);
// posting the data to the database
router.post("/post_data", World_controller.postData);
// foe deleting the data
router.delete("/delete_data", World_controller.deleteData);

module.exports = router;
