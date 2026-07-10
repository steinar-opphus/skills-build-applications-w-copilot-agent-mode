# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, frontend views call API endpoints like `https://your-codespace-name-8000.app.github.dev/api/users/`. When it is not set, the app safely falls back to `http://localhost:8000`.
