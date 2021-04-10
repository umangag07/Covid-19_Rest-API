const express = require("express");
const router = express.Router();
const Total_WorldCases_Controller = require("../Controller/Total_WorldCases");

// retriving the whole data
router.get("/get_data", Total_WorldCases_Controller.retriveData);
// posting the data to the database
router.post("/post_data", Total_WorldCases_Controller.postData);
// deleting the data
router.delete("/delete_data", Total_WorldCases_Controller.deleteData);

module.exports = router;
