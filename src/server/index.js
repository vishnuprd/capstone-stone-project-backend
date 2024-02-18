const express = require('express');
const router = express(); 
const bodyParser = require('body-parser')
const axios = require('axios');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { LoginPageModel} = require('./models/loginschema');
const{RegisterPageModel}=require('./models/Registerschema');
const {WeatherModel}=require('./models/Weatherschema');
const{SuggestionModel}=require('./models/Suggestionschema');
const{SummerModel}=require('./models/Summerschema');
const{WinterModel}=require('./models/Winterschema');
const{RainModel}= require('./models/Rainyschema');
const {CheckoutModel} = require('./models/Checkoutschema');
const{PaymentModel} = require('./models/Paymentschmea');
const{ContactSchemaModel}= require('./models/Contactschema');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;


const corsOption={
    origin:'*',
    credentials:true,
}

router.use(cors(corsOption));
router.use(bodyParser.json())


const connectionString = 'mongodb://localhost:27017/dressdata';
// const client = new MongoClient(connectionString);

mongoose.connect(connectionString);
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
console.log(connectionString);

router.use(express.json());


// register page
router.post('/createuser', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if the user with the given email already exists
        const existingUser = await RegisterPageModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await RegisterPageModel.create({
            fullname,
            email,
            password: hashedPassword // Store the hashed password
        });

        console.log('User creation result:', result);

        const user = await RegisterPageModel.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                return res.status(200).json({ message: 'User registration and login successful' });
            } else {
                return res.status(400).json({ message: 'Password does not match' });
            }
        } else {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.listen(3501, () => {
    console.log('port listening on port 3501');
});

// Login route
router.post('/loginuser', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Input Email:', email);
      console.log('Input Password:', password);
  
      const user = await LoginPageModel.findOne({ email: email.toLowerCase() });
      console.log('Found User:', user);
  
      if (!user) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }
  
      console.log('Hashed Password:', user.password);
//compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Hashed Password from Database:', user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'vsjhfbfsjfwsjhfjhsvfjhsjfsjfvjs');
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.listen(3502, () => {
    console.log('Port listening on port 3502');
  });
  



// logout page
router.use(session({
    secret: 'vsjhfbfsjfwsjhfjhsvfjhsjfsjfvjs',
    resave: false,
    saveUninitialized: true
}));

router.get('/logout', async (req, res) => {
    try {
        await req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal Server Error" });
            } else {
                return res.status(200).json({ message: "User logout successfully" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.listen(3503,()=>{
    console.log('port listening on port 3503')
})


    // Now you can use WeatherModel in the rest of your code
    

// weatherapi data 
router.get('/season-data', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            throw new Error('Latitude and longitude are required.');
        }

        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&routerid=3890b83f160e1b5d0a76cad19107614c`;

        const response = await axios.get(weatherURL);

        console.log('weatherURL:', weatherURL);
        console.log('API Response:', response.data);
        

        if (response.status === 200) {
            const weatherData = response.data;

            const season = determineSeason(weatherData);

            const savedWeatherData = await WeatherModel.create({
                latitude: latitude,
                longitude: longitude,
                date: Date.now(),
                weathercode: weatherData.weather[0].id,
                season: season,
                clothing: getSeasonClothing(season),
            });

            console.log('WeatherModel:', savedWeatherData);

            return res.status(200).json({ message: 'Weather data saved successfully' });
        } else {
            throw new Error('API not fetched');
        }
    } catch (err) {
        console.error('Error:', err.message);

        if (err.response) {
            console.error('Response Data:', err.response.data);
        }

        res.status(500).json({ error: err.message || 'Internal server error' });
    }
});
    

function determineSeason(weatherData) {
    // Assuming temperature is in Celsius and precipitation is in millimeters
    const temperature = weatherData.main.temp;
    const precipitation = weatherData.rain ? weatherData.rain['1h'] || 0 : 0;

    if (temperature >= 25 && precipitation < 5) {
        return 'summer';
    } else if (temperature <= 5) {
        return 'winter';
    } else {
        return 'rainy';
    }
}

function getSeasonClothing(season) {
    switch (season) {
        case 'summer':
            return SummerData.Accessories;
        case 'winter':
            return WinterData.Accessories;
        case 'rainy':
            return RainData.Accessories;
        default:
            throw new Error('Invalid season');
    }
}

router.listen(3504, () => {
    console.log('Server listening on port 3504');
});


router.get('/summer-data', async (req, res) => {
    try {
        // Fetch summer data from the database
        const summerData = await SummerModel.findOne({});

        // Check if data is found
        if (!summerData || summerData.length === 0) {
            return res.status(404).json({ message: 'Summer data not found' });
        }

        // Respond with the fetched data
        return res.status(200).json({ message: 'Summer data fetched successfully', data: summerData });
    } catch (error) {
        console.error('Error fetching summer data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.listen(3506, () => {
    console.log('Server listening on port 3506');
});

router.get('/winter-data', async (req, res) => {
    try {
        
        const winterData = await WinterModel.findOne();


        if (!winterData) {
            return res.status(404).json({ message: 'Winter data not found' });
        }

 
        return res.status(200).json({ message: 'Winter data fetched successfully', data: winterData });
    } catch (error) {
        console.error('Error fetching winter data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.listen(3507, () => {
    console.log('Server listening on port 3507');
});


router.get('/rainy-data', async (req, res) => {
    try {
        // Fetch summer data from the database
        const rainData = await RainModel.findOne();

        // Check if data is found
        if (!rainData || rainData.length === 0) {
            return res.status(404).json({ message: 'rain data not found' });
        }

        // Respond with the fetched data
        return res.status(200).json({ message: 'rain data fetched successfully', data: rainData });
    } catch (error) {
        console.error('Error fetching rain data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.listen(3508, () => {
    console.log('Server listening on port 3508');
});




router.get('/api/suggestion', async (req, res) => {
    try {
        const day = getDayOfWeek();
        const dailyRecord = await SuggestionModel.findOne({
            date: Date.now(),
            day: day,
            suggestion: getDailySuggestion(day),
            dress: getDailySuggestion(day).dress,
            colors: getDailySuggestion(day).colors,
            image: getDailySuggestion(day).image,
        });

        if (dailyRecord) {
            return res.status(404).json({ message: 'No dailyRecord data found' });
        }

        const dailyData = await SuggestionModel.create({
            date: Date.now(),
            day: day,
            suggestion: getDailySuggestion(day),
            dress: getDailySuggestion(day).dress,
            colors: getDailySuggestion(day).colors,
            image: getDailySuggestion(day).image,
        });
        console.log("weatherdata:", dailyData);
        return res.status(200).json({ message: 'Weather data saved successfully', data: dailyData });
    } catch (error) {
        console.error('Error saving weather data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

  
const getDayOfWeek = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};

const getDailySuggestion = (day) => {
    switch (day) {
      case 'Monday':
        return {
            suggestion: 'Wear casual outfits like jeans and a t-shirt.',
            dress: { 
                top: 'T-shirt',
                bottom: 'Jeans'
            },
            colors: {
                top: ['White'],
                bottom: ['Blue']
            },
            image: 'https://img.freepik.com/premium-photo/positive-girl-jeans-white-t-shirt-red-stilettos-posing_105609-3743.jpg',
        };
    case 'Tuesday':
        return {
            suggestion: 'Go for a business casual look with a blazer and dress pants.',
            dress: { 
                top: 'Blazer',
                bottom: 'Dress Pants'
            },
            colors: {
                top: ['Gray'],
                bottom: ['Black']
            },
            image: 'https://images.unsplash.com/photo-1618554754947-e01d5ce3c549?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        };
    case 'Wednesday':
        return {
            suggestion: 'Opt for a comfortable yet stylish outfit for mid-week.',
            dress: { 
                top: 'Top',
                bottom: 'Jeans'
            },
            colors: {
                top: ['Green'],
                bottom: ['Brown']
            },
            image: 'https://i.pinimg.com/736x/ac/2b/79/ac2b790e23b4546b9b553dcee010d108.jpg',
        };
    case 'Thursday':
        return {
            suggestion: 'Dress chic with a pop of color for a stylish Thursday.',
            dress: { 
                top: 'Top',
                bottom: 'Dress'
            },
            colors: {
                top: ['Black'],
                bottom: ['Red']
            },
            image: 'https://i.pinimg.com/736x/5a/a9/20/5aa9207e50c7d60688abb5718e828ca7.jpg',
        };
    case 'Friday':
        return {
            suggestion: 'Prepare for Friday night out with a trendy and fashionable look.',
            dress: { 
                top: 'Top',
                bottom: 'Dress'
            },
            colors: {
                top: ['Silver'],
                bottom: ['Purple']
            },
            image: 'https://di2ponv0v5otw.cloudfront.net/posts/2020/04/09/5e8f912a2ca9ab042cd1bf60/m_5e8f9133bcbb52b092e75314.jpg',
        };
    case 'Saturday':
        return {
            suggestion: 'Enjoy a relaxed brunch with friends in a stylish yet casual outfit.',
            dress: { 
                top: 'Top',
                bottom: 'Sundress'
            },
            colors: {
                top: ['White'],
                bottom: ['Yellow']
            },
            image: 'https://i.pinimg.com/474x/4b/67/73/4b6773244f8c5f37fe5cd432f4247c95.jpg',
        };
    case 'Sunday':
        return {
            suggestion: 'Relax and unwind in comfortable  attire for a lazy Sunday.',
            dress: { 
                top: 'Top',
                bottom: 'Denim Jeans'
            },
            colors: {
                top: ['Pastel Blue'],
                bottom: ['White']
            },
            image: 'https://i.pinimg.com/originals/49/7f/d4/497fd43b740568ad7878dfee2914ae21.jpg',
        };
    default:
        return {
            suggestion: 'No suggestion for today.',
            dress: '',

            colors: [],
            image: [],
        };
}
};

router.listen(3505, () => {
    console.log('Server listening on port 3505');
});





router.post('/checkout', async (req, res) => {
    try {
        const { name, email, address, state, pincode, phoneNumber, createdAt } = req.body;
        console.log("name:", name);
        console.log("Email:", email);
        console.log("Address:", address);
        console.log("State:", state);
        console.log("Pincode:", pincode);
        console.log("Phone Number:", phoneNumber);

        // Check if a record with the given attributes already exists
        const existingUser = await CheckoutModel.findOne({
            name,
            email,
            address,
            state,
            pincode,
            phoneNumber
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Checkout data already exists' });
        }

        // If no existing record found, create a new one
        const newCheckoutUser = await CheckoutModel.create({
            name,
            email,
            address,
            state,
            pincode,
            phoneNumber,
            createdAt
        });

        console.log("New Checkout User:", newCheckoutUser);

        // Send a success response with the new checkout record
        res.status(201).json(newCheckoutUser);
    } catch (err) {
        // If an error occurs, send an error response
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



  router.listen(3601, () => {
    console.log('Server listening on port 3601');
});


router.post('/payment', async (req, res) => {
    try {
        const { cardholderName, cardNumber, cardType, expiryDate, cvv } = req.body;

     
        const paymentUser = await PaymentModel.findOne({
            cardholderName: cardholderName,
            cardNumber: cardNumber,
            cardType: cardType,
            expiryDate: expiryDate,
            cvv: cvv
        });

        if (paymentUser) {
            return res.status(400).json({ message: 'Card details already exist' });
        }


        const newPayment = await PaymentModel.create({
            cardholderName: cardholderName,
            cardNumber: cardNumber,
            cardType: cardType,
            expiryDate: expiryDate,
            cvv: cvv
        });
        console.log("New payment User:", newPayment);

     
        res.status(201).json({ message: 'Payment data saved successfully', data: newPayment });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.listen(3602, () => {
    console.log('Server listening on port 3602');
});


router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

       
        const existingContact = await ContactSchemaModel.findOne({ name, email, subject, message });
        if (existingContact) {
            return res.status(400).json({ message: "Contact details already exist" });
        }

      
        const newContact = await ContactSchemaModel.create({
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        return res.status(200).json({ message: "Contact user created successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.listen(3603, () => {
    console.log('Server listening on port 3603');
});