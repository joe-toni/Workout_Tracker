const {Schema, model} = require('mongoose')
const opts = {toJSON: {virtuals: true}};

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
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
          duration:
          {
              type: Number,
          },
          distance:
          {
              type: Number
          },
          weight:
          {
            type: Number
          },
          reps:
          {
              type: Number
          },
          sets:
          {
              type: Number
          }
      }
  ]
},opts);

workoutSchema.virtual("totalDuration").get(function(){
    let total = 0;
    for (i = 0; i < this.exercises.length; i++)
    {
        total += this.exercises[i].duration;
    }
    return total;
})

const Workout = model("workout", workoutSchema);

module.exports = {Workout};
