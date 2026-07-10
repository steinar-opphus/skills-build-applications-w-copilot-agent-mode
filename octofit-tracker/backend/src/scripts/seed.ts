import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        email: 'maya.chen@example.com',
        name: 'Maya Chen',
        profile: {
          fitnessGoal: 'Build race endurance',
          level: 'Intermediate',
          preferredActivities: ['Running', 'Cycling', 'Mobility'],
        },
      },
      {
        email: 'jordan.reed@example.com',
        name: 'Jordan Reed',
        profile: {
          fitnessGoal: 'Increase functional strength',
          level: 'Advanced',
          preferredActivities: ['Strength training', 'Rowing', 'HIIT'],
        },
      },
      {
        email: 'sofia.martinez@example.com',
        name: 'Sofia Martinez',
        profile: {
          fitnessGoal: 'Improve daily movement consistency',
          level: 'Beginner',
          preferredActivities: ['Walking', 'Yoga', 'Core'],
        },
      },
    ]);

    await Team.insertMany([
      {
        captainEmail: 'maya.chen@example.com',
        focus: 'Cardio endurance and weekly mileage',
        memberEmails: ['maya.chen@example.com', 'sofia.martinez@example.com'],
        name: 'Trail Blazers',
      },
      {
        captainEmail: 'jordan.reed@example.com',
        focus: 'Strength blocks and conditioning challenges',
        memberEmails: ['jordan.reed@example.com'],
        name: 'Kettlebell Crew',
      },
    ]);

    await Activity.insertMany([
      {
        activityType: 'Run',
        caloriesBurned: 420,
        durationMinutes: 42,
        loggedAt: new Date('2026-07-07T13:30:00Z'),
        notes: 'Tempo run with steady pacing through the final mile.',
        userEmail: 'maya.chen@example.com',
      },
      {
        activityType: 'Strength training',
        caloriesBurned: 360,
        durationMinutes: 50,
        loggedAt: new Date('2026-07-08T17:15:00Z'),
        notes: 'Lower-body session with squats, hinges, and loaded carries.',
        userEmail: 'jordan.reed@example.com',
      },
      {
        activityType: 'Yoga',
        caloriesBurned: 150,
        durationMinutes: 35,
        loggedAt: new Date('2026-07-09T07:45:00Z'),
        notes: 'Morning mobility flow focused on hips and hamstrings.',
        userEmail: 'sofia.martinez@example.com',
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: '2026-W28',
        rank: 1,
        score: 945,
        teamName: 'Trail Blazers',
        userEmail: 'maya.chen@example.com',
      },
      {
        period: '2026-W28',
        rank: 2,
        score: 870,
        teamName: 'Kettlebell Crew',
        userEmail: 'jordan.reed@example.com',
      },
      {
        period: '2026-W28',
        rank: 3,
        score: 610,
        teamName: 'Trail Blazers',
        userEmail: 'sofia.martinez@example.com',
      },
    ]);

    await Workout.insertMany([
      {
        description: 'A progressive aerobic session for building endurance without overreaching.',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        exercises: ['10 minute warmup jog', '25 minute tempo run', '10 minute cooldown walk'],
        name: 'Endurance Builder Run',
        targetGoal: 'Build race endurance',
      },
      {
        description: 'Compound strength work paired with short conditioning intervals.',
        difficulty: 'Advanced',
        durationMinutes: 55,
        exercises: ['Back squats', 'Romanian deadlifts', 'Kettlebell swings', 'Row intervals'],
        name: 'Functional Strength Circuit',
        targetGoal: 'Increase functional strength',
      },
      {
        description: 'Low-impact movement sequence to build consistency and confidence.',
        difficulty: 'Beginner',
        durationMinutes: 30,
        exercises: ['Brisk walk', 'Standing mobility', 'Dead bugs', 'Child pose breathing'],
        name: 'Daily Movement Reset',
        targetGoal: 'Improve daily movement consistency',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
