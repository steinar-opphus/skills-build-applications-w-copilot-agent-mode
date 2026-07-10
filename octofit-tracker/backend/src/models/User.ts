import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profile: {
      fitnessGoal: { type: String, required: true },
      level: { type: String, required: true },
      preferredActivities: [{ type: String }],
    },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);