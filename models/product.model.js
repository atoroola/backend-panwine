const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    
    name:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        require: true,
    },
    stock:{
        type: Number,
        require: true,
    },
    image:{
        type: String,
        require: false,
    },
});


const Product = mongoose.model("Product", productSchema);

module.exports= Product;
 

