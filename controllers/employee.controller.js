//const employeeListing=require("../data/employee.data.js");
const EmployeeModel = require("../models/employee.js");
const addEmployeeHandler=async(req,res)=>{
    try{
        const {Name,Email,Gender,Position}=req.body;
        const Image=req.file
        
        //return res.status(200).json({message: email,success:true});
        if(!Name || !Email || !Position || !Gender ||!Image ){
            return res.status(409).json({message:"please fill all field"});
        }
       
        else{
            const newEmployee=await EmployeeModel.findOne({Email});
    if(newEmployee){
        res.status(201).json({message:"Employee already exist",success:false});
    }

    else{
         const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${Image.filename}`;
         const myEmployee=await EmployeeModel.create({Name,Email,Position,Gender,Image:imageUrl});
    await myEmployee.save();
res.status(200).json({message:"add new employee Successfully",success:true, myEmployee}); 
    }
}
 
}
catch(err){
    res.status(500).json({message:" Internal server error".concat(err), success:false});
}
}
const deleteEmployeeHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEmployee = await EmployeeModel.findByIdAndDelete(id);
        if (!deleteEmployee) {
            res.status(500).json({ message: " employee not found", success: false });
        } else {
            res.status(200).json({ message: "Employee deleted successfully", success: true,deleteEmployee });
        }
    } catch (err) {
        res.status(500).json({ message: " Internal server error", success: false });
    }
};
const updateEmployeeHandler=async(req,res)=>{
    try{
        const {id}=req.params;
        const {Name,Email,Gender,Position,Image}=req.body;
        const updateEmployee=await EmployeeModel.findByIdAndUpdate(id,{Name,Email,Gender,Position,Image},{new:true});
        if(!updateEmployee){
            res.status(400).json({message:"employee not found",success:false});
        }
        else{
            res.status(200).json({message:"employee updated successfully",success:true,updateEmployee});
        }
    }
    catch(err){
        res.status(500).json({message:"Internal server error",success:false});
    }
}
const displayEmployeeHandler=async(req,res)=>{
    try{
        const {id}=req.params;
        const displayEmployee=await EmployeeModel.findById(id);
        if(!displayEmployee){
            res.status(400).json({message:"employee not found",success:false});
        }
        else{
            res.status(200).json({message:" employee details are",displayEmployee,success:true});
        }
    }
    catch(err){
        res.status(500).json({message:"Internal server error",success:false});
    }
}
module.exports = { addEmployeeHandler, deleteEmployeeHandler,updateEmployeeHandler,displayEmployeeHandler };
