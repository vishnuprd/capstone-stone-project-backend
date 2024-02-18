
const mongoose = require('mongoose');



const LoginPageSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
});

const LoginPageModel = mongoose.model('login-registration', LoginPageSchema);

module.exports = {LoginPageModel};
    



  
    