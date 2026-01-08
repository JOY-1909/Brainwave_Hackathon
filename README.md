# 🧠 Brainwave - Job Application Platform

Welcome to **Brainwave**! This is a website where you can find jobs and employers can find great candidates.
This guide will help you start the project on your computer, even if you are new to coding!

---

## 🛠️ Step 1: Install What You Need (Prerequisites)

Before you start, make sure you have these two programs installed on your computer.

1.  **Node.js** (The engine that runs the code)
    *   Download it here: [https://nodejs.org/](https://nodejs.org/)
    *   Install the "LTS" version (Recommended for Most Users).
2.  **Git** (To manage the code)
    *   Download it here: [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

## 🚀 Step 2: Download the Project

1.  Open a folder on your computer where you want to keep this project.
2.  Right-click and select "**Open in Terminal**" (or Command Prompt).
3.  Type this command to download the code:
    ```bash
    git clone <YOUR_REPOSITORY_URL_HERE>
    ```
4.  Go into the project folder:
    ```bash
    cd Hack_DTU_Main
    ```

---

## ⚙️ Step 3: Setup the Backend (The Brain)

The "Backend" handles the database and the logic.

1.  Open a **New Terminal** window.
2.  Go to the backend folder:
    ```bash
    cd backend
    ```
3.  Install the necessary libraries:
    ```bash
    npm install
    ```
4.  **Create the Secret Password File (.env)**:
    *   Create a new file named `.env` inside the `backend` folder.
    *   Copy everything from `.env.example` into `.env`.
    *   *Ask the project owner for the real values if you don't have them!*
5.  Start the Backend:
    ```bash
    npm run dev
    ```
    *   You should see: `Server running on port 5000` and `MongoDB Connected`.

---

## 🎨 Step 4: Setup the Frontend (The Face)

The "Frontend" is what you see in the browser.

1.  Open **Another New Terminal** window.
2.  Go to the frontend folder:
    ```bash
    cd frontend
    ```
3.  Install the necessary libraries:
    ```bash
    npm install
    ```
4.  **Create the Secret Password File (.env)**:
    *   Create a new file named `.env` inside the `frontend` folder.
    *   Copy everything from `.env.example` into `.env`.
5.  Start the Website:
    ```bash
    npm run dev
    ```
6.  You will see a link like `http://localhost:8080`. **Ctrl + Click** that link to open the website!

---

## 🐞 Troubleshooting (If things go wrong)

*   **"Command not found"**: Make sure you installed Node.js in Step 1.
*   **"MongoDB Connection Error"**: Check if your `.env` file in the `backend` folder has the correct `MONGO_URI`.
*   **"Port already in use"**: This means another program is using the same port. Close other terminals or restart your computer.

---

**Happy Coding!** 🚀
