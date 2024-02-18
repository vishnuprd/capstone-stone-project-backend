const mongoose = require ("mongoose")

const PaymentSchema = new mongoose.Schema({
    cardholderName: {
         type: String, 
         },
    cardNumber: { 
        type: Number,
     },
    cardType: { 
        type: String, 
     },
    expiryDate: { 
        type: Date,
         },
    cvv: { 
        type: String, }
});

const PaymentModel = mongoose.model("payment", PaymentSchema);

module.exports={PaymentModel}