const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 },
  { id: 2, title: "Deep Work", author: "Cal Newport", year: 2016 },
];

/* 1️GET all books (Filter + Pagination) */
app.get("/books", (req, res) => {
  let { author, year, page = 1, limit = 10 } = req.query;

  page = Number(page);
  limit = Number(limit);

  let filtered = books;

  if (author) {
    filtered = filtered.filter(
      b => b.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (year) {
    filtered = filtered.filter(
      b => b.year === Number(year)
    );
  }

  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    total: filtered.length,
    page,
    limit,
    data: filtered.slice(start, end)
  });
});

/* 2 Add Book (Year Validation) */
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;

  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Invalid year" });
  }

  const newBook = { id: books.length + 1, title, author, year };
  books.push(newBook);

  res.status(201).json(newBook);
});

/* 3Search by Title */
app.get("/books/search", (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const result = books.filter(b =>
    b.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(result);
});

app.listen(3000, () => console.log("Server running on port 3000"));
