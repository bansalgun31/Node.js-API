const Joi=require("joi");
const employeeValidation=(req,res,next)=>{
const schema = Joi.object({
    Name:Joi.string().min(3).max(100).required(),
    Gender:Joi.string().required(),
    Position:Joi.string().required(),
    Email:Joi.string().email().required()

});
const {error}=schema.validate(req.body);
if(error){
    return res.status(400).json({message:"Bad request",error});
}
next();
}
module.exports=employeeValidation;