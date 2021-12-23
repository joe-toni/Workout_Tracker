const {Schema, model} = require('mongoose')

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
              default: 1
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
});

const Workout = model("workout", workoutSchema);

module.exports = {Workout};
