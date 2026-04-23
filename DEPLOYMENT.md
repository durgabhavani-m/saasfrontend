# Deployment Guide

This frontend is configured to use the production backend at **https://saasbackend-p8k8.onrender.com**.

## Quick Deploy (Vercel)

1. Push your code to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set the **Root Directory** to `frontend` (if the frontend is inside a `frontend` folder).
4. Add environment variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://saasbackend-p8k8.onrender.com/api`
5. Deploy.

If you omit the env variable, the app will still use the production backend via the built-in fallback.

## Deploy to Render (Static Site or Web Service)

1. Connect your GitHub repo.
2. Create a **Web Service** or **Static Site**.
3. For Web Service:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `cd frontend && npm start`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://saasbackend-p8k8.onrender.com/api`
5. Deploy.

## Local Development

- **Against production backend:** Ensure `.env` has `NEXT_PUBLIC_API_URL=https://saasbackend-p8k8.onrender.com/api` (default).
- **Against local backend:** Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api` in `.env` and run your backend on port 5000.
