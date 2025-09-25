const express=require("express");
const {signupValidation, loginValidation}=require("../middlewares/auth.middleware.js");
const { signup, login } = require("../controllers/auth.controller");

const router=express.Router();
router.post("/login",loginValidation,login)
router.post("/signup",signupValidation,signup)

module.exports=router;