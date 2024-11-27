const jwt = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if (!longToken) {
            res.status(401).json({ message: "token not present"});
        }else {
            const token = longToken.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            next();
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "invalid token"});
        
    }
};
const isAdmin = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if (!longToken) {
            res.status(401).json({ message: "token not present"});
        }else {
            const token = longToken.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            if(user.role !== "Admin" ){
                res.status(403).json({message: "only Admin's are authorized"});
            }else{
                user.role !==( "Admin");
            console.log(user);
            req.user = user;
            next();
        } }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "invalid token"});
        
    }
};

const isCustomer = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if (!longToken) {
            res.status(401).json({ message: "token not present"});
        }else {
            const token = longToken.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            if(user.role === "Customer" ){
                res.status(403).json({message: "welcome to Customer's app"});
            }else{
                if(user.role === "Admin"){
                    res.status(403).json({message: "welcome to Customer's app"});   
                }else{
                user.role !==( "Customer");
                res.status(403).json({message: "only Customer and admin are allowed"});   
            }

            console.log(user);
            req.user = user;
            next();
        } }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "invalid token"});
        
    }
};



module.exports = { isTokenValid, isAdmin, isCustomer};