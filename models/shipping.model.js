const mongoose = require("mongoose");
const shippingSchema = mongoose.Schema({
    adrress:{
        type: String,
        required: true,
    },
    fullname:{
        type: String,
        required: true, 
    }
});


const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;