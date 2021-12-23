const router  = require("express").Router();
const db = require("../models/workout");

//This route will be used by our index page which takes the returned array and displays the object in the last position.
//Understanding that, the route finds all the objects in the workout collection and sorts it in accending order based on the 
//day field so the object with the latest date finds itself in the last position.
router.get("/workouts", async (req, res) => 
{
    try
        {
            const result = await db.Workout.find({}).sort({day : 1});
            res.status(200).json(result);
        }
catch(err)
    {
        res.status(400).json(err);
    }
});

//This route will be used by our stats page and is supposed to display the latest 7 workouts, so our search sorts all the workouts
//In our db by date from latest to furthest and limits the result to the first 7. After wards the resulting array is reversed since the 
//stats js simply displays the given array with out checking for accending order. Reversing the initail array gets us the latest  workouts
// In accending order from furthest to latest before returning that result.
router.get("/workouts/range", async (req, res) => 
{
    try
        {
            const result = await db.Workout.find({}).sort({day: -1}).limit(7);
            result.reverse();
            res.status(200).json(result);
        }
    catch(err)
        {
            res.status(400).json(err);
        }
});

//This route simply finds the workout corresponding to the paramiter id and pushes the given request body into the array of 
//exercises for that day. This one is rather simple since the data collection is handled by the js file, we basically just place
//it in the correct spot in our db.
router.put("/workouts/:id", async (req, res) => 
{
    try
        {
            const result = await db.Workout.findByIdAndUpdate(req.params.id, {$push:{exercises: req.body}});
            res.status(200).json(result);
        }
    catch(err)
        {
            res.status(400).json(err);
        }
});

//This route allows the app to create new instances in our db, since most of the data collection is handled by the js file this
// post route is pretty simple simply calling the create method on or db model and passing in the request body.
 router.post("/workouts", async (req, res) => 
 {
        try
            {
                const result = await db.Workout.create(req.body);
                res.status(200).json(result);
            }
        catch(err)
            {
                res.status(400).json(err);
            }
});

module.exports = router;