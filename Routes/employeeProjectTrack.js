const express = require('express');
const router = express.Router();

const trackControllers = require("../Controllers/employeeProjectTrack");

router.post('/', trackControllers.addHistory)


module.exports = router;