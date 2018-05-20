var mongoose = require('mongoose');
var Employee = require('../models/Employee');

// For Functions
var employeeController = {};

// Show list employees data
employeeController.list = (req,res) => {
    Employee.find({}).exec((err, employees) => {
        if(err){
            console.log("Error : ", err);
        }else{
            res.render('../views/employees/index',{employees: employees});
        }
    });
};

// Show by id
employeeController.show = (req, res) => {
    Employee.findOne({_id: req.params.id}).exec((err, employee) => {
        if(err){
            console.log("Error:",err);
        }else{
            res.render('../views/employees/show',{ employee: employee });
        }
    });
};

// Show page for create data
employeeController.create = (req,res) => {
    res.render('../views/employees/create');
};

// Save data
employeeController.save = (req,res) => {
    var employee = new Employee(req.body);
    
    // Saving data to collection
    employee.save((err)=>{
        if(err){
            console.log(err);
            res.render('../views/employees/create');
        }else{
            console.log('Succesfully created employee');
            res.redirect('/employees/show/'+ employee._id);
        }
    });
};

// Edit data
employeeController.edit = (req,res) => {
    Employee.findOne({ _id: req.params.id }).exec((err, employee) => {
        if(err){
            console.log('Error :', err);
        }else{
            res.render('../views/employees/edit',{ employee: employee });
        }
    });
};

// Updating data
employeeController.update = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, { $set: 
        { 
            name: req.body.name, 
            address: req.body.address,
            position: req.body.position, 
            salary: req.body.salary 
        }
    }, { new: true },(err, employee) => {
        if(err){
            console.log(err);
            res.render("../view/employees/edit", { employee: req.body });
        }

        res.redirect('/employees/show/'+ employee._id);
    });
};

// Deleting data
employeeController.delete = (req,res) => {
    Employee.remove({ _id: req.params.id }, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log('Employee has deleted');
            res.redirect('/employees');
        }
    });
};

module.exports = employeeController;