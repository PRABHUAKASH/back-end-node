const express = require("express");
const router = express.Router();
const employeeModule = require("../modules/employeeModule");
const auth= require("../modules/authModule");

router.get("/get", employeeModule.getEmployees);

router.put("/update/:id",auth.authorizeuser, employeeModule.updateEmployees);

router.post("/create",auth.authorizeuser, employeeModule.createEmployees);

router.delete("/delete/:id",auth.authorizeuser, employeeModule.deleteEmployees);

module.exports = router;