import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { connectDatabase } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const asyncRoute = (handler: (request: Request, response: Response) => Promise<void>) => {
  return (request: Request, response: Response, next: NextFunction) => {
    handler(request, response).catch(next);
  };
};

app.get('/api/users/', asyncRoute(async (_request: Request, response: Response) => {
  const users = await User.find().sort({ name: 1 }).lean();

  response.json({
    baseUrl: apiBaseUrl,
    data: users,
    resource: 'users',
  });
}));

app.get('/api/teams/', asyncRoute(async (_request: Request, response: Response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();

  response.json({
    baseUrl: apiBaseUrl,
    data: teams,
    resource: 'teams',
  });
}));

app.get('/api/activities/', asyncRoute(async (_request: Request, response: Response) => {
  const activities = await Activity.find().sort({ loggedAt: -1 }).lean();

  response.json({
    baseUrl: apiBaseUrl,
    data: activities,
    resource: 'activities',
  });
}));

app.get('/api/leaderboard/', asyncRoute(async (_request: Request, response: Response) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();

  response.json({
    baseUrl: apiBaseUrl,
    data: leaderboard,
    resource: 'leaderboard',
  });
}));

app.get('/api/workouts/', asyncRoute(async (_request: Request, response: Response) => {
  const workouts = await Workout.find().sort({ name: 1 }).lean();

  response.json({
    baseUrl: apiBaseUrl,
    data: workouts,
    resource: 'workouts',
  });
}));

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error('API error:', error);
  response.status(500).json({ error: 'Internal server error' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });