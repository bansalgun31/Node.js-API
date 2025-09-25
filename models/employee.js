const mongoose=require("mongoose");
const EmployeeSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
     Email:{
        type:String,
        required:true,
        unique:true,
    },
    Gender:{
        type:String,
        required:true,
    },
    Position:{
        type:String,
        required:true
    },
    Image:{
        type:String,
    }
});
const EmployeeModel=mongoose.model('employee',EmployeeSchema);
module.exports=EmployeeModel;