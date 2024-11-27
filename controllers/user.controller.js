const mongoose = require("mongoose");
const User = require("../models/user.model");


async function signupUser(req, res){
    try {
        const userExist = await User.findOne({
            $and: [{ email: req.body.email },{ firstname: req.body.firstname }],
          });
          if (userExist){
          res.status(400).json ({message: "user already exist"});
        } else{
            const user = new User(req.body);
            let token = user.generateToken();
            await user.save();
            res.status(201).json({message: "user created successfully", data:{ user,token}});
          }   
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error",});    
    }
};

async function loginUser(req, res){
    try {
        const userExist = await User.findOne({email: req.body.email});
      console.log(req.body.password)
          if (!userExist){
          res.status(400).json ({message: "user not found"});
        } else{
            let passwordMatch = userExist.checkPassword(req.body.password);
           if (passwordMatch){
            let token = userExist.generateToken();
            res.status(201).json({message: "user logged in successfully", data: {userExist, token},});
           }else{
            res.status(400).json ({message: "incorrect password"});
           }
           
          }   
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"});    
    }
};




module.exports = {signupUser, loginUser};
