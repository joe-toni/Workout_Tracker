const {Schema, model} = require('mongoose')
//This variable will be used to let mongoose know that a virtual field is available to send via json
const opts = {toJSON: {virtuals: true}};

//This schema will be used to setup the model in our db
const workoutSchema = new Schema(
{
   //This field catches the date that the schema instance is created by default
    day: 
    {
        type: Date,
        default: Date.now
    },
    //This field is an array of nested objects with each object representing an exercise for that day, 
    //since most of the other fields besides type and name don't technically need extra specifications,
    //they were left in their simplified forms.
  exercises:
    [
        {
            type: 
                {
                    type: String,
                    enum: ['resistance', 'cardio'],
                    default: 'resistance'
                },
            name: 
                {
                    type: String,
                    default: "general",
                },
            duration: Number,
            distance: Number,
            weight: Number,
            reps: Number,
            sets: Number,
        }
    ]
},opts);

//This virtual field will use the existing values in a schema object to form the totalDuration field needed by the application. 
//Since it is a virtual field It can be called like an normal field but is not actually saved on the model.
workoutSchema.virtual("totalDuration").get(function()
{
    let total = 0;
    for (i = 0; i < this.exercises.length; i++)
        {
            total += this.exercises[i].duration;
        }
    return total;
})

//This establishes our schema as a model to be used by our js.
const Workout = model("workout", workoutSchema);

module.exports = {Workout};
