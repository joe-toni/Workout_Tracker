const router = require("express").Router();
const displayRoutes = require("./display");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/", displayRoutes);

module.exports = router;