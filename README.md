# 🔐 Password Generator App

A secure, customizable password generator web application built with **React (frontend)** and **Node.js + Express (backend)**. Easily generate strong passwords using selected character sets and desired length.

---

## 🚀 Features

- ✅ Toggle password character sets (A–Z, a–z, 0–9, special characters)
- ✅ Hide/show generated password
- ✅ Copy to clipboard
- ✅ Mobile responsive dark theme
- ✅ Full-stack architecture (frontend + backend)
- ✅ Deployable on Render & Vercel

---

## 🛠️ Tech Stack

| Layer     | Technology            |
|-----------|------------------------|
| Frontend  | React, HTML, CSS       |
| Backend   | Node.js, Express.js    |
| Styling   | Plain CSS (no Tailwind) |
| Hosting   | Vercel (frontend), Render (backend)

---

## 📂 Project Structure

```
Password-Generator/
├── backend/       # Express server
│   └── index.js
├── frontend/      # React app
│   └── src/
│       └── App.jsx, App.css
├── README.md
```

---

## 🧑‍💻 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/anonzombie0309/Password-Generator.git
cd Password-Generator
```

### 2. Setup Backend

```bash
cd backend
npm install
node index.js
```

The backend will run at: `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Runs on: `http://localhost:3000`

---

## 🌐 Deployment

### ✅ Backend (Render.com)

1. Go to https://render.com
2. Create a new Web Service
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node index.js`
6. Deploy!

### ✅ Frontend (Vercel.com)

1. Go to https://vercel.com
2. Import the GitHub repo
3. Set **Root Directory** to `frontend`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `build`
6. Add environment variable:  
   `REACT_APP_API=https://your-backend-name.onrender.com`
7. Deploy!

---

## 🔗 Environment Variable (Frontend)

Create a `.env` file inside `frontend/`:

```
REACT_APP_API=https://password-generator-hcjt.onrender.com
```

Used in `App.jsx` like:

```js
fetch(\`\${process.env.REACT_APP_API}/generate\`, {...})
```

---

## 📸 Demo


- Frontend: [[https://password-generator-yrlu.vercel.app/](https://password-generator-yrlu.vercel.app/)]
- Backend: [[https://password-generator-hcjt.onrender.com](https://password-generator-hcjt.onrender.com)]

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

Made with 💻 by [anonzombie0309](https://github.com/anonzombie0309)
