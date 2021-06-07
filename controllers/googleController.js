const axios = require("axios");
const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        const { query: params } = req;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${params.q}&maxResults=20`)
            .then(results =>
                results.data.items.filter(
                    result =>
                        result.id &&
                        result.volumeInfo.title &&
                        result.volumeInfo.infoLink &&
                        result.volumeInfo.authors &&
                        result.volumeInfo.description &&
                        result.volumeInfo.imageLinks.thumbnail
                )
            )
            // Look in the database, if a book is already saved, do not display it in the results from the api
            .then(apiBooks => 
                db.Book.find().then(dbBooks => 
                    apiBooks.filter(apiBook => 
                        dbBooks.every(dbBook => 
                            dbBook.googleId !== apiBook.id
                        )
                    )
                )
            )
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    }
}
