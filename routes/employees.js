var express = require('express');
var router = express.Router();

// Import Controller
var employee = require('../controllers/EmployeeController.js');

// Get all employees
router.get('/', employee.list);

// Get employee by id
router.get('/show/:id',employee.show);

router.get('/create',employee.create);

// Save employee
router.post('/save', employee.save);

// Get employee by id for editing data
router.get('/edit/:id', employee.edit);

// Updating data
router.post('/update/:id', employee.update);

//  Deleting data
router.post('/delete/:id', employee.delete);

module.exports = router;
