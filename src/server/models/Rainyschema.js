const mongoose = require('mongoose');

const RainSchema = new mongoose.Schema({
    Season: String,
    Dress: [
        { name: String, colors: [String], price: String, image: String }
    ],
    item: [
        { name: String, colors: [String], price: String, image: String }
    ]
});

const RainModel = mongoose.model('RainData', RainSchema);

module.exports = { RainModel };

const rainData = new RainModel({
    Season: 'rainy',
    Dress: [
        { name: 'Waterproof Trench Coat', colors: ['Navy Blue', 'Olive Green', 'Mustard Yellow'], price: "1450", image: "https://images-cdn.ubuy.co.in/65b976998d6718648975e432-wantdo-women-39-s-waterproof-trench.jpg" },
        { name: 'Rain Jacket and Pants Set', colors: ['Turquoise', 'Yellow', 'Coral'], price: "1220", image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/9444293/2019/4/29/89fcb9ea-046e-4b7c-bc5e-6a72ab61c3891556529544095-Zeel-Womens-Blue-Solid-Longline-Rain-Jacket-3501556529543055-1.jpg" },
        { name: 'Hooded Poncho', colors: ['Clear', 'Navy Blue', 'Red'], price: "1100", image: "https://www.mamainastitch.com/wp-content/uploads/2017/07/Oversized-Crochet-Poncho-Pattern-9.jpg" },
        { name: 'Lightweight Waterproof Dress', colors: ['Aqua Blue', 'Lime Green', 'Yellow'], price: "1200", image: "https://m.media-amazon.com/images/I/512NnNOX0PL._AC_UY1100_.jpg" },
    ],
    item: [
        { name: 'Compact Travel Umbrella', colors: ['Black', 'Navy Blue', 'Maroon'], price: "650", image: "https://m.media-amazon.com/images/I/81jWZS0d8jL.jpg" },
        { name: 'Waterproof Crossbody Bag', colors: ['Clear', 'Yellow', 'Navy Blue'], price: "1235", image: "https://cdnp2.stackassets.com/24f649fdf91aaac44fdfd52a30531f9f269d433a/store/opt/489/367/7abce5979bc63a22bd3bee6bcb52001d7217b01fe3520e1c455d19b37413/SKU__006_800x.jpg" },
        { name: 'Quick-Dry Towel Scarf', colors: ['Gray', 'Burgundy', 'Teal'], price: "350", image: "https://m.media-amazon.com/images/I/41D5kSB9L6L._AC_SR300,300.jpg" },
        { name: 'Waterproof Phone Case', colors: ['Transparent', 'Blue', 'Pink'], price: "550", image: "https://m.media-amazon.com/images/I/71EP3N4AY4L.jpg" },
    ]
});

rainData.save()
    .then(savedData => {
        console.log('Saved rainData:', savedData);
    })
    .catch(error => {
        console.error('Error saving rainData:', error);
    });
