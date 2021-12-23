const router  = require("express").Router();
const db = require("../models/workout");

router.get("/workouts", async (req, res) => {
try
{
    const result = await db.Workout.find({}).sort({date: -1});

    res.status(200).json(result);
}
catch
{
    res.status(400).json(err);
}
})

module.exports = router;