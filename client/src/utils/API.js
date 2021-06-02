import axios from "axios";

const apis = {
    // Get books from Google API
    getBooks: function (q) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + q + "&maxResults=20");
    }
};

export default apis;
