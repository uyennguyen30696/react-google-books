import axios from "axios";

const apis = {
    // Get books from Google API
    getBooks: function (q) {
        return axios.get("/api/google", {
            params: { q: q }
        });
    },
    // Save a book to the database
    saveBook: function(bookData) {
        return axios.post("/api/books", bookData);
    },
    getSavedBooks: function() {
        return axios.get("/api/books");
    },
    getOneSavedBook: function(title) {
        return axios.get("/api/search_one", {
            params: { data: title }
        }); 
    },
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    }
};

export default apis;
