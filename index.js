
const express = require ("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();
const { signupUser } = require("./controllers/user.controller");
const {loginUser}= require("./controllers/user.controller");
const {validateSignupData} = require("./validators/signup.user.validator");
const {validateLogInData}= require("./validators/login.user.validator");
const { createProduct, fetchAllProduct,fetchProductById,deleteProduct,updateProduct}= require("./controllers/product.controller");
const { isTokenValid, isAdmin, isCustomer}= require("./middlewares/index");
require("./utils/passport");
const User = require("./models/user.model");



const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(
    session({
      secret: process.env.SESSION_SECRET, // session secret
      resave: false,
      saveUninitialized: false,
    })
  );


  server.use(passport.initialize());
server.use(passport.session());

server.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  
  // Call back route
  server.get(
    "/auth/google-redirect",
    passport.authenticate("google", {
      access_type: "offline",
      scope: ["email", "profile"],
    }),


   async (req, res) =>  {
     try {
      if (!req.user) {
        res.status(400).json({ error: "Authentication failed" });
      }
      // return user details
      
       const googleUser = {fullname:req.user.name.givenName+ " "+req.user.name.familyName,  email:req.user.emails[0].value,  password:req.user.id, role: "Customer"};
     
      const googleUserExist = await User.findOne({
        $and: [{ email: req.user.emails[0].value },{ fullname:googleUser.fullname}],
      });
      console.log(googleUserExist);
      if (googleUserExist){
        let token = googleUserExist.generateToken();
        res.status(201).json({message: "user logged in successfully", data: {googleUserExist , token},});

      }else{
        const user = new User(googleUser);
        let token = user.generateToken();
        await user.save();
        res.status(201).json({message: "user created successfully", data:{ user,token}})
      }
     } catch (error) {
      console.log(error);
      res.status(500).json({message: "server error",}); 
     }
    
    }
  );
  
   
  
server.get("/Admin", isAdmin, isTokenValid, (req,res) =>{
    try{
        res.status(200).json({message: "welcome to Admin's App"});
    } catch (error){
        console.log(error );
        res.status(500).json({message: " server error"});
    }
});

server.get("/Customer", isCustomer, isTokenValid, (req,res) =>{
    try{
        res.status(200).json({message: "welcome to Customer's App"});
    } catch (error){
        console.log(error );
        res.status(500).json({message: " server error"});
    }
});

server.post("/signup", validateSignupData, signupUser);
server.post("/login", validateLogInData, loginUser);

 

server.post("/product",  isTokenValid,isAdmin, createProduct);
server.get("/product",fetchAllProduct);
server.get("/product/:id", isTokenValid,fetchProductById);
server.delete("/product/:id", isTokenValid,isAdmin,deleteProduct);
server.put("/product/:id",isTokenValid, isAdmin,updateProduct);




server.all("/", (req, res)=>{
    try {
        res.status(200).json({message: "welcome to our server"});
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "server error"});  
    }
})

server.all("*", (req,res)=>{
    try {
        res.status(404).json({message: "page not found"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
    }
})


server.listen(3065, async () =>{
    try {
        console.log( "server listening on port 3065"); 
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("db connected");
    } catch (error) {
        console.log(error);
        
    }
   
   
});

















// const express = require("express");
// const mongoose = require("mongoose");
// const{createUser} = require("./controllers/user.controller.js");
// const{createProduct, fetchAllProduct, fetchProductById,updateProduct,deleteProduct} = require("./controllers/product.controller.js");


// const server=("express");
// server.use(express.json());
// server.use(express.urlencoded({extended: true}));


// server.post("/user", createUser);
// server.post("/product", createProduct);
// server.get("/product", fetchAllProduct);
// server.get("/product/:id",fetchProductById );
// server.put("/product/:id", updateProduct);
// server.delete("/product/:id", deleteProduct);


// server.all("/", (req, res)=>{
//     try {
//         res.status(200).json({message: "welcome to our server"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"server error"});
        
//     }
// }

// );

// server.all("*", (req,res)=>{
//     try {
//         res.status(404).json({message: "page not found "});
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: " server error"});
        
//     }
// });

// server.listen(6057, async() =>{
//     try {
//         console.log("server is running on port 6057");
//         await mongoose.connect('mongodb://127.0.0.1:27017/test');
//         console.log("database is connected");
        
//     } catch (error) {
//         console.log("error");
        
//     }
    

// });









