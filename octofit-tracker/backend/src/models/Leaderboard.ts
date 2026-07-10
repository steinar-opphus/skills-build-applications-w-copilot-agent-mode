import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    teamName: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);