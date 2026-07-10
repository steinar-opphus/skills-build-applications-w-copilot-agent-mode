import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String }],
    name: { type: String, required: true },
    targetGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);