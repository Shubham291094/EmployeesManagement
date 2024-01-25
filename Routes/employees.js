const express = require('express');
const router = express.Router();

//controller declaration
const employeesController = require('../Controllers/employees');

router.post('/', employeesController.addEmployee);
router.get("/all", employeesController.getALLEmployees);
router.post("/upload", employeesController.uploadFile);
module.exports = router;