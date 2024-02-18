const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    name:{
        type:String,
    },
  email:{ 
    type: String, 
 },
  address:  { 
    type: String, 
 },
  city: { 
    type: String, 
},
  state: { 
    type: String, 
 },
  pincode:  { 
    type: String,
  },
  phoneNumber: { 
    type: String, 
 },
  createdAt:{ 
    type: Date, 
    default: Date.now
 }
});

const CheckoutModel = mongoose.model('Checkout', CheckoutSchema);


module.exports = {CheckoutModel};