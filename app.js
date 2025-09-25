const express=require("express");
const app=express();
const joi=require("joi");
const connectDb=require("./config/db.js");

const authRoute=require("./Routes/auth.routes.js");
//const EmployeeRoute=require("./Routes/employee.routes.js");
require('dotenv').config();
const EmployeeRoute=require("./Routes/employee.routes.js");
const PORT=process.env.PORT;
//const bodyParser=require('body-parser');
app.use(express.json());
app.use('/uploads', express.static('uploads'));



app.get("/ping",(req,res)=>{
    res.send("hiii");
})



app.use("/auth",authRoute)
app.use("/list",EmployeeRoute);
app.listen(PORT,()=>{
    console.log("server is running");

})