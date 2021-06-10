const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.Book.create(req.body)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    },
    findAll: function(req, res) {
        db.Book.find(req.body)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    },
    findByTitle: function(req, res) {
        db.Book.find({ title: JSON.parse(req.query.data).title })
        .then(dbTitle => {
            res.json(dbTitle)
        })
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Book.findById(req.params.id)
            .then(dbBook => dbBook.remove())
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    }
}
