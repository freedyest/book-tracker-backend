const mongoose = require('mongoose');

// Skema untuk Buku
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverUrl: { type: String, default: '' },
  startdate:{ type: Date, default: null },
  isFinished: { type: Boolean, default: false },
  finishDate: { type: Date, default: null },
});

// Model Buku
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
