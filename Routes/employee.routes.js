const jwt=require("jsonwebtoken");
const multer=require("multer");
//const upload=multer();
require('dotenv').config();
const EmployeeModel = require("../models/employee.js");
const express=require("express");
const router=express.Router();

const employeeListing=require("../data/employee.data.js")
const employeeValidation=require("../middlewares/employee.middleware.js")
const { addEmployeeHandler,deleteEmployeeHandler, updateEmployeeHandler,displayEmployeeHandler } = require("../controllers/employee.controller");

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {return res.status(403).json({ message: 'Invalid token' });}
    req.user = user; // attach decoded user payload to req object
    next(); // move to next middleware or route
  });
}
const storage=multer.diskStorage({
 destination: function(req,file,cb){
    cb(null,"uploads/");
  },
  filename: function(req,file,cb){
    cb(null,Date.now() + "_" +file.originalname);
  }
})
const upload = multer({ storage: storage });


router.get("/employee",verifyToken,async(req, res) => {
    const allEmployees = await EmployeeModel.find(); 
    res.json(allEmployees);
  
});

router.post("/employee/new",verifyToken,upload.single("Image"),addEmployeeHandler);
router.get("/employee/:id",verifyToken,displayEmployeeHandler);
router.delete("/employee/:id",verifyToken,deleteEmployeeHandler);
router.put("/employee/:id",verifyToken,employeeValidation,updateEmployeeHandler);

module.exports=router;

