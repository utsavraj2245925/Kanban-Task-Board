# 🧠 Project Prompt – Kanban Task Board

## 🎯 Mission 5: The "Kanban Task Board"

### 🏷 Theme:
React.js, Components, useState, Props, Drag & Drop, LocalStorage

---

## 📌 Goal

Build a Trello-like Task Management Board using React.js following modern best practices.

The project should follow the "React Way" — no manual DOM manipulation.

State-driven UI updates must be implemented.

---

## 🛠 Requirements

### 1️⃣ Project Setup

- Use `npm create vite@latest`
- Framework: React
- Variant: JavaScript
- Do NOT use create-react-app

---

## 🧩 Core Features

### 📋 Layout
Create three columns:

- To Do
- In Progress
- Done

---

### ➕ Add Task

- Text input to add new task
- Task should be added to "To Do" column

---

### ❌ Delete Task

- Each task card must have delete button
- Clicking delete removes the task

---

### 🔄 Move Task

- Buttons to move task between columns
- Example:
  - Move to In Progress
  - Move to Done

---

## ✨ Advanced Features (Polish)

### ✏️ Edit Task

- Clicking on task text should convert it into input field
- User can edit and save changes

---

### 🚦 Priority System

When creating a task, user must select:

- High
- Medium
- Low

Visual Indicator:

- High → Red Border
- Medium → Yellow Border
- Low → Green Border

---

### 💾 Persistence

- Use localStorage
- Tasks must remain after page refresh

---

## 🏆 Professional Touch

### 🖱 Drag and Drop

- Use dnd-kit or react-beautiful-dnd
- Smooth drag from one column to another

---

### 🔍 Search Filter

- Add search bar at top
- Filter tasks by name in real-time

---

## 📂 Expected Architecture

- App.jsx → Main state logic
- Column.jsx → Column component
- TaskCard.jsx → Individual task component
- App.css → Styling

---

## 🧠 Learning Objectives

- Understand React state management
- Component reusability
- Lifting state up
- Controlled components
- Conditional rendering
- Drag and drop integration
- LocalStorage usage
- UI reactivity

---

## 🚀 Bonus Ideas

- Dark Mode
- Due Date feature
- Animations
- Backend integration
- Authentication system

---

## 🎓 Final Deliverable

A fully functional Kanban Task Board with:

- Clean UI
- Modern design
- Smooth drag & drop
- Persistent storage
- Proper component structure
- Production-ready code

---

End of Prompt
