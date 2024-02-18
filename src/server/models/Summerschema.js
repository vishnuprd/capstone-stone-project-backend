const mongoose = require('mongoose');

const SummerSchema = new mongoose.Schema({
    Season: String,
    Dress: [
        {  name: String, colors: [String], price: String, image: String }, 
    ],
    item: [
        {  name: String, colors: [String], price: String, image: String } 
    ]
});

const SummerModel = mongoose.model('SummerData', SummerSchema);

module.exports = { SummerModel };

const summerData = new SummerModel({
    Season: 'summer',
    Dress: [
        { id: '1', name: 'Sundress', colors: ['Pastel Yellow', 'Sky Blue', 'Coral'], price: "3000", image: "https://t3.ftcdn.net/jpg/01/94/94/52/360_F_194945297_GJxRnNSrwD8vovKMo4smu8lIea4fMkfT.jpg" },
        { id: '2', name: 'Maxi Dress', colors: ['Mint Green', 'Lavender', 'Peach'], price: "4000", image: "https://assets.ajio.com/medias/sys_master/root/20230621/VCdm/6492a084d55b7d0c63931a7e/-473Wx593H-464333541-green-MODEL.jpg" },
        { id: '3', name: 'Wrap Dress', colors: ['Navy Blue', 'Blush Pink', 'Olive Green'], price: "2850", image: "https://5.imimg.com/data5/ECOM/Default/2023/5/310696685/JX/GV/HD/159110959/wald-wrap-dress-soft-and-breathable-fabric-and-comfortable-cut-sdr1-s-womens-dress-brown-living-526728-500x500.jpg" },
        { id: '4', name: 'Off-Shoulder Dress', colors: ['Coral', 'Royal Blue', 'White'], price: "1250", image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20445786/2022/10/18/ef67fe1e-b0e0-40b9-bba1-6844759e17401666097607037Dresses1.jpg" },
        { id: '5', name: 'A-Line Dress', colors: ['Turquoise', 'Mustard Yellow', 'Rose Pink'], price: "2215", image: "https://assets.ajio.com/medias/sys_master/root/20230801/663S/64c92c9deebac147fc9de0b6/-473Wx593H-466410399-white-MODEL.jpg" },
        
    ],
    item: [
        { id: '1', name: 'Floppy Hat', colors: ['Beige'], price: "560", image: "https://media.istockphoto.com/id/153829776/photo/a-straw-large-rimmed-beach-hat-on-a-white-background.jpg?s=612x612&w=0&k=20&c=S_CuquK-n8j2d9_1VxKnBcnLtaeny9oVqUG9HfJpssA=" },
        { id: '2', name: 'Strappy Sandals', colors: ['Tan'], price: "1120", image: "https://assets.ajio.com/medias/sys_master/root/h96/haa/14599560953886/-473Wx593H-460496203-black-MODEL.jpg" },
        { id: '3', name: 'Sunglasses', colors: ['Rose Gold'], price: "4500", image: "https://t3.ftcdn.net/jpg/01/55/44/40/360_F_155444041_wGBQoCShe1yApALDIimSTaJ997NxJ0q6.jpg" },
        { id: '4', name: 'Wide-Brimmed Hat', colors: ['White'], price: "780", image: "https://m.media-amazon.com/images/I/71-2JEle0BS._SL1500_.jpg" },
        { id: '5', name: 'Wedge Sandals', colors: ['Gold'], price: "950", image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/21948896/2023/3/20/53060eb5-747d-4f5d-9a5a-b25baa468bd81679311318396-Shoetopia-Printed-Open-Toe-Wedge-Heels-6791679311317950-1.jpg" },
       
    ]
});

summerData.save()
    .then(savedData => {
        console.log('Saved summerData:', savedData);
    })
    .catch(error => {
        console.error('Error saving summerData:', error);
    });
