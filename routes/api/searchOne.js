const router = require("express").Router();
const bookController = require("../../controllers/bookController");

// Matches with "/api/books"
router.route("/")
    .get(bookController.findByTitle)

module.exports = router;
