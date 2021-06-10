const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google");
const searchOneRoutes = require("./searchOne");

// Book routes
router.use("/books", bookRoutes);

// Search one route
router.use("/search_one", searchOneRoutes);

// Google routes
router.use("/google", googleRoutes);

// For anything else, render the html page
router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
