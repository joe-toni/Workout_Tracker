const router = require("express").Router();
const path = require("path");

//The routes on this page are simply meant to dish out the files provided in the public folder with each of the 
//specified route taken from the route used by the given anchor tags in the index.html file.
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;