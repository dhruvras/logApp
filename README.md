# logApp

A work-in-progress application for tracking and managing logs with AI capabilities. The project is currently under active development and the architecture has evolved from its initial plan.

## Current Tech Stack

### Frontend
- **Framework**: React Native with [Expo](https://expo.dev/)
- **Routing**: Expo Router (file-based navigation with tabs)
- **Language**: TypeScript

### Backend
- **Framework**: Node.js with Express
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: Azure AI Inference (`@azure-rest/ai-inference`)
- **Deployment Ready**: Configured for serverless deployment using `serverless-http` (AWS Lambda compatible)

## Project Structure

```
logApp/
├── frontend/       # React Native application
│   ├── app/        # Expo Router screens (tabs, layouts)
│   ├── components/ # Reusable UI components
│   └── assets/     # Images, fonts, etc.
└── backend/        # Express.js API server
    ├── src/
    │   ├── modules/# Mongoose schemas (e.g., Log model)
    │   ├── routers/# API route definitions
    │   └── controllers/ # Request handlers
    ├── server.js   # Local development server entry point
    └── lambda.js   # Serverless execution entry point
```

## Running Locally

### Backend
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Make sure you have a `.env` file configured.
4. Start the development server: `npm run dev` (uses nodemon)

### Frontend
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start Expo development server: `npm start`
4. Use the Expo Go app or an emulator (iOS/Android) to view the app.

## Data Models

The core entity currently implemented is a `Log`, which tracks:
- `description`: The main content of the log
- `notes`: Additional context or details
- `time`: When the event occurred
- `tags`: Array of categories (potentially AI-generated)

## Future Roadmap

The project has pivoted from the original "big plan" and is now iterating based on the current foundation. Upcoming changes will focus on:
- Refining the integration with Azure AI for smart log processing.
- Expanding frontend capabilities and UI/UX.
- Finalizing the serverless deployment pipeline.


A personal developer activity tracker. Log your coding sessions, get auto-detected tech tags, track your daily streak, and visualize your progress over time.

Built with **React Native (Expo)** · **AWS Lambda** · **Express.js** · **MongoDB Atlas** · **GitHub Models (GPT-4o)**

---

## What it does

You finish a coding session, open the app, and log what you worked on. DevLog automatically detects which technologies you used from your notes, tracks your daily streak, and gives you weekly analytics — total hours, most-used tech stacks, and your coding consistency over time.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native + Expo |
| Backend | AWS Lambda + Express.js |
| API | AWS API Gateway |
| Database | MongoDB Atlas |
| AI Tagging | GitHub Models (GPT-4o) |
| Scheduler | AWS EventBridge (CRON) |

---

## Architecture

```
React Native App (Expo)
        |
        | HTTPS
        ▼
  AWS API Gateway
        |
   ┌────┴─────────────────────────────┐
   |            AWS Lambda             |
   |  ┌──────────┐  ┌──────────────┐  |
   |  │POST      │  │GET /stats    │  |
   |  │/sessions │  │(Aggregation) │  |
   |  └──────────┘  └──────────────┘  |
   |  ┌──────────┐  ┌──────────────┐  |
   |  │GET       │  │Streak Tracker│  |
   |  │/sessions │  │(CRON nightly)│  |
   |  └──────────┘  └──────────────┘  |
   └────────────────────────┬─────────┘
                            |
                     MongoDB Atlas
                  (sessions · users)
```

---

## Features

**Session Logging** — Log what you worked on, how long, and optional notes. Saved instantly via a Lambda POST endpoint.

**Auto-Tagging** — Your session notes are scanned for tech keywords (Node.js, JWT, MongoDB, etc.) automatically. If keywords don't match, it falls back to GPT-4o via GitHub Models for smarter detection.

**Streak Tracker** — A nightly EventBridge CRON Lambda checks if you logged a session today and updates your current and longest streak.

**Analytics** — A MongoDB aggregation pipeline computes your weekly hours, top tags by time spent, and daily coding chart.

---

## Getting Started

### Prerequisites

- Node.js 18+
- AWS account with Lambda + API Gateway access
- MongoDB Atlas free cluster
- GitHub personal access token (for GitHub Models)
- Expo CLI (`npm install -g expo-cli`)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/devlog.git
cd devlog
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
MONGODB_URI=mongodb+srv://your-cluster-url/devlog
GITHUB_TOKEN=your_github_personal_access_token
```

### 3. Deploy Lambda functions

Each folder inside `/functions` is a separate Lambda. Zip and deploy each one to AWS Lambda, then connect to API Gateway.

```bash
cd functions/createSession
zip -r function.zip .
# Upload function.zip in AWS Lambda console
```

Set environment variables in each Lambda's Configuration tab (same as your `.env`).

### 4. Run the Expo app

```bash
cd app
npm install
npx expo start
```

Update `app/api/client.js` with your API Gateway base URL.

---

## API Endpoints

### POST /sessions
Log a new coding session.

**Request body:**
```json
{
  "title": "Fixed JWT refresh token bug",
  "duration_minutes": 150,
  "notes": "Tricky part was the expiry logic in Express middleware",
  "date": "2025-05-27"
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "_id": "664abc...",
    "title": "Fixed JWT refresh token bug",
    "duration_minutes": 150,
    "tags": ["JWT", "Auth", "Express.js"],
    "date": "2025-05-27"
  }
}
```

### GET /sessions
Fetch recent sessions for the home feed.

### GET /stats
Returns weekly analytics via MongoDB aggregation.

**Response:**
```json
{
  "totalHours": 14.5,
  "totalSessions": 6,
  "currentStreak": 7,
  "longestStreak": 12,
  "topTags": [
    { "tag": "MongoDB", "hours": 5.2 },
    { "tag": "Node.js", "hours": 3.8 }
  ],
  "dailyHours": [2.5, 1.75, 3.0, 0.5, 2.0, 4.75, 0]
}
```

---

## Auto-Tagging Logic

Tags are detected in two steps:

1. **Keyword matching** — the session title and notes are scanned against a built-in keyword map covering 20+ technologies. Fast and free.
2. **AI fallback** — if no keywords match, the text is sent to GPT-4o via GitHub Models, which returns a JSON array of tags. Handles informal or vague notes.

```
"spent 3 hours fighting that annoying database query bug"
→ keyword match: 0 tags found
→ AI fallback: ["MongoDB", "Backend", "Debugging"]
```

---

## MongoDB Schema

**sessions collection:**
```json
{
  "_id": "ObjectId",
  "userId": "string",
  "title": "string",
  "duration_minutes": "number",
  "notes": "string",
  "tags": ["string"],
  "date": "Date",
  "createdAt": "Date"
}
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GITHUB_TOKEN` | GitHub personal access token for Models API |

Never commit your `.env` file. It is listed in `.gitignore`.

---

## License

MIT