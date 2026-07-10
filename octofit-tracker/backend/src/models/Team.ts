import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    captainEmail: { type: String, required: true },
    focus: { type: String, required: true },
    memberEmails: [{ type: String }],
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);