const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/books", bookRoutes);

// For anything else, render the html page
router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
