const mongoose=require("mongoose");
require('dotenv').config();
const EmployeeModel = require("../models/employee");
const employees = require("../data/employee.data.js");

//Gunna@2004
//mongodb+srv://bansalgun31_db_user:Gunna@2004@cluster0.cnmprxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const connectDb = process.env.MONGO;

async function connectAndSeedDb() {
  try {
    await mongoose.connect(connectDb);
    console.log("Mongodb connected successfully");
    for (let emp of employees) {
      const exists = await EmployeeModel.findOne({ Email: emp.Email });
      if (!exists) {
        await EmployeeModel.create({
          Name: emp.Name,
          Email: emp.Email,
          Gender: emp.Gender,
          Position: emp.Position,
          Image:emp.Image
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

connectAndSeedDb();