# 🚀 Deployment Guide: SMV E-Commerce Marketplace

This guide will help you deploy your full-stack MERN application for free using **Render** (Backend) and **Vercel** (Frontend).

---

## Part 1: Backend Deployment (Render)

1.  **Sign Up/Login**: Go to [render.com](https://render.com) and log in with GitHub.
2.  **Create Service**:
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository: `Rashidzada/smv_ecom`.
3.  **Configure Settings**:
    *   **Name**: `smv-backend` (or similar)
    *   **Root Directory**: `server` 👈 **IMPORTANT**
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
4.  **Environment Variables**:
    *   Scroll down to **Environment Variables** and add:
        *   `MONGO_URI`: (Paste your MongoDB Atlas connection string)
        *   `JWT_SECRET`: `your_secure_secret_key` (e.g., `smv_secret_prod_123`)
        *   `NODE_ENV`: `production`
5.  **Deploy**: Click **Create Web Service**.
    *   Wait for the build to finish.
    *   **Copy the URL** provided by Render (e.g., `https://smv-backend.onrender.com`). You will need this for the frontend!

---

## Part 2: Frontend Deployment (Vercel)

1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and log in with GitHub.
2.  **Add New Project**:
    *   Click **Add New...** -> **Project**.
    *   Import your repository: `Rashidzada/smv_ecom`.
3.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect automatically)
    *   **Root Directory**: Click **Edit** and select `client` 👈 **IMPORTANT**
4.  **Environment Variables**:
    *   Expand **Environment Variables**.
    *   Add:
        *   **Name**: `VITE_API_URL`
        *   **Value**: Paste your **Render Backend URL** (e.g., `https://smv-backend.onrender.com/api`) 👈 **Add `/api` at the end!**
5.  **Deploy**: Click **Deploy**.
    *   Wait for the confetti! 🎉
    *   Click **Continue to Dashboard**.

---

## Part 3: Final Connection Check

1.  Open your **Vercel App URL** (e.g., `https://smv-ecom.vercel.app`).
2.  Try to **Login** or **Register**.
    *   If it works, your Frontend is talking to your Backend on Render!
3.  **Troubleshooting**:
    *   If login fails, check the **Console** (F12) for errors.
    *   Ensure your Render backend is "Live" and the URL in Vercel is correct (starts with `https://` and ends with `/api`).

---

**Congratulations! Your project is now live on the web!** 🌍
