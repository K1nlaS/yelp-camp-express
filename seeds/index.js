if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const dbUrl = process.env.DB_URL;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Database connected");
}

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDV = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <= 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 21) + 10;
    const camp = new Campground({
      author: "62ec0dd7745b4031a6d2b863",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptatum quasi? Explicabo maxime odit a fugiat aliquam. Ut cumque dolorum quod laboriosam, vero et veritatis totam, commodi eveniet, obcaecati a.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dhp74p3e6/image/upload/v1659540861/YelpCamp/oz8qk7pqb4oxroobf5f9.jpg',
          filename: 'YelpCamp/osgqjpb6cmycznwcfiyu',
        },
        {
          url: 'https://res.cloudinary.com/dhp74p3e6/image/upload/v1659540862/YelpCamp/ewrucejdzeght8c5d5o1.jpg',
          filename: 'YelpCamp/b3zjkakj0hye5jizypzj',
        },
        {
          url: 'https://res.cloudinary.com/dhp74p3e6/image/upload/v1659540862/YelpCamp/njfxgefaxeobpknq5hou.jpg',
          filename: 'YelpCamp/gdc4cjwunn7ekaoyus8f',
        }
      ]
    })
    await camp.save();
  }
}

seedDV().then(() => {
  mongoose.connection.close();
})