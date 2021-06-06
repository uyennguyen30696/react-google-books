import axios from "axios";

const apis = {
    // Get books from Google API
    getBooks: function (q) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + q + "&maxResults=20");
    },
    // Save a book to the database
    saveBook: function(bookData) {
        return axios.post("/api/books", bookData);
    }
};

export default apis;
