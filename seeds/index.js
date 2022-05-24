const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})


const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const price = Math.floor(Math.random() * 20) + 10
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum qui quae nisi, praesentium pariatur error ullam repellat recusandae soluta voluptatibus assumenda dolor, minima alias, in harum totam. Vel, dignissimos ipsa.',
            price,
            geometry: {
                type: 'Point', coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            //your user id
            author: '628722a1d3f15c49a5f89502',
            images: [{
                url: 'https://res.cloudinary.com/djsyh5syl/image/upload/v1653200323/YelpCamp/j5oyf6oscu1fxqa4ffbg.jpg',
                filename: 'YelpCamp/sl3zqj5jhrmhfiknbjxr',
            }]

        })
        await camp.save()
    }
}


seedDB().then(() => {
    mongoose.connection.close()
})

