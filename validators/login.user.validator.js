const Joi = require("joi")

const loginSchema = Joi.object({
    email: Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: {allow: ["com", "net"]},
    })
    .required(),
    role:Joi.string().valid("Admin", "Customer").required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    
});

function validateLogInData(req,res,next){
    try {
       const {error, value}  = loginSchema.validate(req.body);
       if (error){
console.log(error);
res.status(400).json({message: error.details[0].message});
       }else{
        next();
       }
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error"});
        
    }
}
module.exports = {validateLogInData};