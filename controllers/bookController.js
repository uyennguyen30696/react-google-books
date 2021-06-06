const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.Book.create(req.body)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    }
}
