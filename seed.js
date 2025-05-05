const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Debug

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ Connected to MongoDB");

    return Book.insertMany([
      {
        title: "Sooley",
        author: "John Grisham",
        coverUrl: "https://images-na.ssl-images-amazon.com/images/I/51V5ZpFyaFL._SX331_BO1,204,203,200_.jpg",
        dateAdded: new Date("2024-08-01"),
        finishDate: new Date("2024-08-04")
      },
      {
        title: "Million Dollar Weekend",
        author: "Noah Kagan",
        coverUrl: "https://m.media-amazon.com/images/I/61HcX6xSAwL.jpg",
        dateAdded: new Date("2024-07-25"),
        finishDate: new Date("2024-07-28")
      }
    ]);
  })
  .then(() => {
    console.log("✅ Data berhasil ditambahkan!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Gagal:", err);
  });
