const express = require("express");
const router = express.Router();
const PredictedData_Controller = require("../Controller/PredictedData_controller");


router.get("/india", PredictedData_Controller.retriveIndiaData);
router.get("/world", PredictedData_Controller.retriveWorldData);

module.exports = router;