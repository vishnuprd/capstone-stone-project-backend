
const mongoose = require('mongoose');



// const ClothSchema = new mongoose.Schema({
//     name: String,
//     colors: [String],
// });

// const ItemSchema = new mongoose.Schema({
//     name: String,
//     colors: [String],
//     price: Number,
//     URL: String,
// });

// const SummerSchema = new mongoose.Schema({
//     Season: String,
//     Dress: [
//         { name: String, colors: [String] }
//     ],
//     item: [
//         { name: String, colors: [String] }
//     ]
// });



const SuggestionSchema = new mongoose.Schema({
    day: {
        type: String,
    },
    suggestion: {
        type: Object,
    },
    dress: {
        top: String,
        bottom: String,
    },
    colors: {
        top: [String],
        bottom: [String],
    },
    image: String,
});
console.log(SuggestionSchema);

const SuggestionModel = mongoose.model('Suggestion', SuggestionSchema);

module.exports = { SuggestionModel };




