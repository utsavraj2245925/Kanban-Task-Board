# 🚀 Kanban Task Board

A modern Trello-like Task Management Board built using **React.js + Vite**.

This project demonstrates React fundamentals including:

- Components
- useState
- Props
- Drag and Drop
- LocalStorage Persistence
- Filtering
- Editing Tasks

---

## 📌 Features

### ✅ Core Features
- Add Task
- Delete Task
- Move Task between columns
- Three columns:
  - To Do
  - In Progress
  - Done

### ✨ Advanced Features
- Inline Task Editing
- Priority System (High / Medium / Low)
  - 🔴 High → Red Border
  - 🟡 Medium → Yellow Border
  - 🟢 Low → Green Border
- Drag and Drop using dnd-kit
- Search / Filter Tasks
- Data Persistence using localStorage

---

## 🛠 Tech Stack

- React.js
- Vite
- dnd-kit
- CSS3
- LocalStorage API

---

## 📂 Project Structure

```
kanban-board/
│
├── src/
│   ├── components/
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/kanban-board.git
```

### 2️⃣ Go inside project

```bash
cd kanban-board
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Start development server

```bash
npm run dev
```

Now open:

```
http://localhost:5173
```

---

## 🎯 How It Works

- All tasks are stored in React state.
- Every update automatically re-renders UI.
- Tasks are saved in `localStorage`.
- On refresh, tasks are restored automatically.
- Drag & Drop updates task status dynamically.

---

## 📸 Screenshots

(Add your screenshots here)

---

## 🌟 Learning Outcomes

This project helps understand:

- React Component Architecture
- State Management
- Lifting State Up
- Controlled Inputs
- Conditional Rendering
- Drag and Drop Integration
- Persistence in Frontend Applications

---

## 🚀 Future Improvements

- Dark Mode
- User Authentication
- Due Dates
- Animations
- Backend Integration (Node + MongoDB)

---

## 👨‍💻 Author

Your Name  
Frontend Developer

---

## 📜 License

This project is open source and available under the MIT License.
