# 🗓️ The Scheduler — University Timetable Management System

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack web application for managing university timetable schedules with role-based access for **Admins**, **Lecturers**, and **Students**. Features a built-in **Anti-Clashing Mechanism** that prevents double-booking of lecture halls and lecturers.


---

## 📖 Project Overview

The Scheduler is designed to solve the real-world problem of timetable conflicts in universities with large numbers of lecturers (1,000+) and students (4,000+). The system allows:

- **Admins** to create, manage, and generate timetables with automatic clash detection.
- **Lecturers** to view their personal lecture schedules on a calendar.
- **Students** to view department-filtered lecture schedules on a calendar.

The Anti-Clashing engine validates every new timetable entry against the existing database in real-time, preventing hall double-bookings, lecturer conflicts, and duplicate entries.

---

## 🏗️ System Architecture Diagram

![System Architecture](./docs/system-architecture.png)

---

## 🗄️ Database Diagram

![Database Diagram](./docs/database-diagram.png)
---

## ✨ Features

### 🔐 Authentication & Authorization
- Role-based login system (Admin / Student / Lecturer) determined by email prefix
- JWT token-based session management with HTTP-only cookies
- Secure password hashing with `bcryptjs`

### 📅 Timetable Management (Admin)
- Create, read, update timetable entries
- Manage Lecturers, Students, Modules, and Lecture Halls
- Real-time calendar generation with conflict prevention

### 🛡️ Anti-Clashing Mechanism
The core feature that prevents scheduling conflicts:

![Anti Clash Flow](./docs/anti-clash-flow.png)

**Overlap Detection Formula:**
```
isTimeOverlap = (newStart < existingEnd) AND (newEnd > existingStart)
```

### 📆 Calendar Views
- **Students** see lectures filtered by their department
- **Lecturers** see lectures filtered by their assigned module
- Ant Design Calendar with Drawer for detailed event info

### 💬 Feedback System
- Students can submit feedback for specific modules and lecturers

### 🔌 Real-time Communication
- Socket.IO integration for future real-time notifications

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Redux Toolkit, React Router v6 |
| **UI Libraries** | Ant Design, TailwindCSS, Material UI, Framer Motion, Heroicons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | JWT (jsonwebtoken), bcryptjs, cookie-parser |
| **Real-time** | Socket.IO |
| **Dev Tools** | Nodemon, Axios, Moment.js |

---

## 📂 Project Structure

```
The Scheduler/
├── timetableschedule_backend-main/
│   ├── config/                  # Database connection config
│   ├── controllers/             # Route handler logic
│   │   ├── adminSignin.js       # Login controller (Admin/Student/Lecturer)
│   │   ├── adminSignup.js       # Registration controller
│   │   ├── getCalender.js       # Calendar CRUD + Anti-Clash Engine
│   │   ├── manageLecturers.js   # Lecturer CRUD operations
│   │   ├── manageStudents.js    # Student CRUD operations
│   │   ├── manageModules.js     # Module CRUD operations
│   │   ├── managelectureHalls.js# Lecture Hall CRUD operations
│   │   └── feedBackDetails.js   # Feedback CRUD operations
│   ├── middleware/              # JWT auth middleware
│   ├── models/                  # Mongoose schemas
│   │   ├── adminModel.js        # Admin schema
│   │   ├── studentTable.js      # Student schema
│   │   ├── lectureTable.js      # Lecturer schema
│   │   ├── calenderTable.js     # Timetable/Calendar schema
│   │   ├── moduleTable.js       # Module schema
│   │   ├── lecturehall.js       # Lecture Hall schema
│   │   └── feedBack.js          # Feedback schema
│   ├── routes/                  # API route definitions
│   ├── utils/
│   │   └── timeNormalizer.js    # 12h/24h time conversion utility
│   ├── index.js                 # Server entry point + Socket.IO
│   └── .env                     # Environment variables
│
├── timetableschedule_frontend-main/
│   └── src/
│       ├── components/
│       │   ├── Admin/           # Admin dashboard components
│       │   │   ├── GenerateTimetable.jsx
│       │   │   ├── ManageLectures.jsx
│       │   │   ├── ManageStudents.jsx
│       │   │   └── ManageTimeTable.jsx
│       │   ├── Student/         # Student dashboard components
│       │   │   ├── DBCalendar.jsx
│       │   │   ├── DBHeader.jsx
│       │   │   └── DBFeedback.jsx
│       │   └── Lecture/         # Lecturer dashboard components
│       │       ├── LecCalendar.jsx
│       │       └── LecHeader.jsx
│       ├── containers/          # Page-level components
│       ├── store/               # Redux slices
│       ├── context/             # React context for auth
│       └── App.js               # Root component + routing
│
└── README.md
```

---

## 🚀 Installation Guide

### Prerequisites
- **Node.js** v18+ installed
- **MongoDB Atlas** account (or local MongoDB instance)
- **npm** or **yarn** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "The Scheduler"
```

### 2. Backend Setup
```bash
cd timetableschedule_backend-main
npm install
```

Create a `.env` file in the backend root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
PORT=8000
TOKEN_SECRET_KEY=your_jwt_secret_key_here
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd timetableschedule_frontend-main
npm install
npm start
```

### 4. Access the Application
| Interface | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:8000` |

### 5. Login Credentials
Roles are determined by the email prefix:
- **Admin:** `name.admin@domain.com`
- **Student:** `name.stu@domain.com` 
- **Lecturer:** `name.lec@domain.com`

---

## 🔐 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Backend server port | `8000` |
| `TOKEN_SECRET_KEY` | JWT signing secret key | `my_super_secret_key_123` |

---

## 🔮 Future Improvements

1. **MongoDB Compound Indexes** — Add unique compound indexes on `[halls, lecture_date, start_time]` and `[lecturername, lecture_date, start_time]` to prevent race conditions during concurrent Admin usage.

2. **Real-time Notifications** — Leverage existing Socket.IO infrastructure to push live clash alerts and lecturer availability notifications to the Admin dashboard.

3. **Batch Timetable Auto-Generation** — Implement an intelligent scheduling algorithm that auto-generates conflict-free timetables for entire batches.

4. **Student Batch Clash Detection** — Extend the Anti-Clash engine to also verify that students in the same batch are not scheduled for conflicting lectures.

5. **Export to PDF/Excel** — Allow Admins to export generated timetables as downloadable PDF or Excel files.

6. **Mobile Responsive UI** — Optimize the frontend for tablet and mobile viewing for students and lecturers on-the-go.

7. **Email Notifications** — Send automated email alerts to lecturers when their schedule is created or modified.

8. **Audit Logging** — Track who created/modified each timetable entry with timestamps for accountability.

---

<p align="center">
  Built with ❤️ by Sangeeth Basnayake
</p>
