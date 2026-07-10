import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    activityType: { type: String, required: true },
    caloriesBurned: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    loggedAt: { type: Date, required: true },
    notes: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);