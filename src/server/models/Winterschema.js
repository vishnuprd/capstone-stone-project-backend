const mongoose = require('mongoose');

const WinterSchema = new mongoose.Schema({
    Season: String,
    Dress: [
        { name: String, colors: [String], price: String, image: String }, 
    ],
    item: [
        { name: String, colors: [String], price: String, image: String }
    ]
});

const WinterModel = mongoose.model('WinterData', WinterSchema);

module.exports = { WinterModel };

const winterData = new WinterModel({
    Season: 'winter',
    Dress: [
        { name: 'Turtleneck Sweater Dress', colors: ['Charcoal Gray', 'Burgundy', 'Navy Blue'], price: "2500", image: "https://m.media-amazon.com/images/I/513ykWbHGTL._AC_UY1100_.jpg" },
        { name: 'Cable Knit Midi Dress', colors: ['Cream', 'Mauve', 'Forest Green'], price: "1759", image: "https://media.boohoo.com/i/boohoo/gzz15498_oatmeal_xl_3/female-oatmeal-maternity-cable-knit-knitted-midi-dress" },
        { name: 'Velvet Wrap Dress', colors: ['Deep Red', 'Emerald Green', 'Navy'], price: "1500", image: "https://static3.azafashions.com/tr:w-450/uploads/product_gallery/1-0510951001672474614.jpg" },
        { name: 'Tweed Shift Dress', colors: ['Black and White', 'Burgundy', 'Mustard Yellow'], price: "2450", image: "https://www.talbots.com/dw/image/v2/BKGN_PRD/on/demandware.static/-/Sites-master-catalog-talbots/default/dwca7ebcdb/images/224036763/224036763_8466.jpg?sfrm=jpg" },
        { name: 'Cashmere Tunic Dress', colors: ['Heather Gray', 'Dusty Pink', 'Taupe'], price: "1980", image: "https://i.etsystatic.com/9674298/r/il/9cf00d/2700227468/il_570xN.2700227468_49lm.jpg" },
    ],
    item: [
        { name: 'Pom Pom Beanie', colors: ['Gray', 'Burgundy', 'Navy'], price: "1000", image: "https://manetain.in/cdn/shop/products/Newblack.jpg?v=1673879130&width=700" },
        { name: 'Faux Fur-lined Boots', colors: ['Black', 'Chestnut', 'Gray'], price: "3500", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/955e1c758a7b86e609be58307cd2db38.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp" },
        { name: 'Leather Gloves', colors: ['Black', 'Brown', 'Dark Red'], price: "1358", image: "https://t4.ftcdn.net/jpg/03/96/38/13/360_F_396381305_SSPHfxv54bfRTCBbqmQgaowu8bsB3n9L.jpg" },
        { name: 'Infinity Scarf', colors: ['Charcoal Gray', 'Plum', 'Teal'], price: "1000", image: "https://www.scarves.net/cdn/shop/products/Petra_Plaid_Infinity_Scarf_Blue_With_Model_800x.jpg?v=1573191807" },
        { name: 'Knit Ear Muffs', colors: ['Cream', 'Mauve', 'Navy'], price: "450", image: "https://m.media-amazon.com/images/I/71zP0J6ngAL._AC_UY1100_.jpg" },
    ]
});

winterData.save()
    .then(savedData => {
        console.log('Saved winterData:', savedData);
    })
    .catch(error => {
        console.error('Error saving winterData:', error);
    });
