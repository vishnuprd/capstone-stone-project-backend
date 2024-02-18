
const mongoose = require('mongoose');


const RegisterPageSchema = new mongoose.Schema({
    fullname: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        // required: true,
    },
});

const RegisterPageModel = mongoose.model('user-registration', RegisterPageSchema);

module.exports = { RegisterPageModel};
