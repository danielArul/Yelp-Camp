const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // userNewUrlParser : true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '632629dad127474724d7832c',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://api.unsplash.com/photos/random?client_id=D8F_VQyNGjSquBSKlhpEhrOiZkn3a_3eDwbQECG-WJg',
            description: 'sdasdadsa',
            price,
            geometry:{
              type:"Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dgmrvanab/image/upload/v1666339291/YelpCamp/zjnopgqpnfenzrpqlwnd.jpg',
                  filename: 'YelpCamp/zjnopgqpnfenzrpqlwnd',
                   
                },
                {
                  url: 'https://res.cloudinary.com/dgmrvanab/image/upload/v1666339292/YelpCamp/aja3kzbfmo0rzil0batj.jpg',
                  filename: 'YelpCamp/aja3kzbfmo0rzil0batj',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dgmrvanab/image/upload/v1666339292/YelpCamp/o3oqr2enqmzoyy7ibnur.jpg',
                  filename: 'YelpCamp/o3oqr2enqmzoyy7ibnur',
                
                }
              ]
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
});