const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Model Buku

// Endpoint untuk menambahkan buku baru
router.post('/', async (req, res) => {
  const { title, author, coverUrl } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      coverUrl,
      startdate: new Date(),
      isFinished: false,
      finishDate: null,
    });

    await newBook.save();
    res.status(201).json(newBook); // Mengirimkan buku yang baru disimpan
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint untuk mengambil semua buku
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Endpoint untuk mengambil detail buku berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Endpoint untuk memperbarui data buku
router.put('/:id', async (req, res) => {
  const { title, author, coverUrl } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Update properti buku
    book.title = title;
    book.author = author;
    book.coverUrl = coverUrl;

    await book.save();
    res.json(book); // Mengembalikan data buku setelah diupdate
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint untuk mengubah status selesai dibaca atau membatalkan status selesai
router.patch('/:id/finish', async (req, res) => {
  const bookId = req.params.id;
  const { isFinished } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Update status isFinished dan tanggal selesai (termasuk jam)
    book.isFinished = isFinished;
    book.finishDate = isFinished ? new Date() : null;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Endpoint untuk menghapus buku berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
