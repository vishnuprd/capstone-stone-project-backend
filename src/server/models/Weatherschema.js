
const mongoose = require('mongoose');



const DressSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
    },
    colors: [String],
});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
    },
    colors: [String],
});

const WeatherSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
    },
    Dress: [DressSchema],
    item: [itemSchema],
});

const WeatherModel = mongoose.model('weather-data', WeatherSchema);

module.exports={WeatherModel};