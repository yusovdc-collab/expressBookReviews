const express = require('express');
const axios = require('axios');
const books = require('./booksdb.js');
const { isValid, users } = require('./auth_users.js');

const public_users = express.Router();

// Task 1: Get all books
public_users.get('/', (req, res) => {
    return res.status(200).json(books);
});

// Task 2: Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

// Task 3: Get books by author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();
    const matchingBooks = {};

    Object.keys(books).forEach(isbn => {
        if (books[isbn].author.toLowerCase() === author) {
            matchingBooks[isbn] = books[isbn];
        }
    });

    return res.status(200).json(matchingBooks);
});

// Task 4: Get books by title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    const matchingBooks = {};

    Object.keys(books).forEach(isbn => {
        if (books[isbn].title.toLowerCase() === title) {
            matchingBooks[isbn] = books[isbn];
        }
    });

    return res.status(200).json(matchingBooks);
});

// Task 5: Get book reviews
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

// Task 6: Register a new user
public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (isValid(username)) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    users.push({ username, password });

    return res.status(201).json({
        message: "User successfully registered. Now you can login"
    });
});

// Task 10: Get all books using async/await and Axios
const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("All Books:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving books:", error.message);
        throw error;
    }
};

// Task 11: Get book by ISBN using async/await and Axios
const getBookByISBN = async (isbn) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/isbn/${encodeURIComponent(isbn)}`
        );

        console.log("Book by ISBN:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving book by ISBN:", error.message);
        throw error;
    }
};

// Task 12: Get books by author using async/await and Axios
const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/author/${encodeURIComponent(author)}`
        );

        console.log("Books by Author:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving books by author:", error.message);
        throw error;
    }
};

// Task 13: Get books by title using async/await and Axios
const getBooksByTitle = async (title) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/title/${encodeURIComponent(title)}`
        );

        console.log("Books by Title:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving books by title:", error.message);
        throw error;
    }
};

// Export routes and asynchronous functions
module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;
