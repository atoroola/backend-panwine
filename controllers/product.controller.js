const mongoose = require("mongoose");
const Product = require("../models/product.model");


async function createProduct(req, res){
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({message: "product  created successfully", data: product});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error",});    
    }
}



async function fetchAllProduct(req,res) {
    try {
        const product = await Product.find();
        res.status(201).json({message: "products found successfully", data: product});
           
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error",});    
       
    }
    
}

async function fetchProductById(req,res) {
    try {
        const product = await Product.findById(req.params.id);
        if (product){
            res.status(200).json({message: "product found successfully", data: product});
        }else{
            res.status(404).json({message: "product not avalable", data: product});
        }    
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error",});    
       
    }
    
}
async function updateProduct(req,res){
    try{
      const product = await Product.findById( req.params.id);
      if(!product){
        res.status(404).json({ message: "product is not available" });
      }else{
       let updatedProduct = await product.updateOne({ $set: req.body }) ;
        res.status(200).json({ message: "product details updated", data: updatedProduct});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  }
   

async function deleteProduct(req,res) {
    try {
        const product = await Product.findById( req.params.id);
      if(!product){
        res.status(404).json({ message: "product is not available" });
      }else{
        await product.deleteOne({ $set: req.body });
        res.status(200).json({ message: "product deleted", data: product});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }  
}


module.exports = {createProduct,fetchAllProduct, fetchProductById,deleteProduct,updateProduct};

