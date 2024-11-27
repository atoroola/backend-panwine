const Joi = require("joi")

const signupSchema = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: {allow: ["com", "net"]},
    })
    .required(),
    role:Joi.string().valid("Admin", "Customer").required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    phone: Joi.string().required(),
});

function validateSignupData(req,res,next){
    try {
       const {error, value}  = signupSchema.validate(req.body);
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
module.exports = {validateSignupData};